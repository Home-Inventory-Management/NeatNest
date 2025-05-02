import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GroceryListManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const API_URL = "http://localhost:5000/api/groceries";
  const Categories = ["Fruits", "Vegetables", "Meat", "Dairy", "Bakery", "Beverages", "Snacks", "Canned Goods"];

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        const transformedData = response.data.map(item => ({
          productId: item.id,
          name: item.name,
          categories: [item.category],
          price: 0,
          quantity: item.quantity,
          imageUrl: item.image_url || ''
        }));
        setGroceries(transformedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching groceries:", err);
        setError("Failed to load groceries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroceries();
  }, []);

  const filteredData = (category) => {
    return groceries.filter(
      (item) =>
        item.categories.includes(category) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.includes("All") || selectedCategories.includes(category))
    );
  };

  const handleDelete = async (productId) => {
    const productName = groceries.find(item => item.productId === productId)?.name || "this item";
    const confirmDelete = window.confirm(`Are you sure you want to delete this item: ${productName}?`);
    console.log("Delete confirmation:", confirmDelete);
    console.log("Product ID to delete:", productId);
    console.log("Product name to delete:", productName);
    console.log("Current groceries state:", groceries);
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/${productId}`);
        setGroceries(groceries.filter(item => item.productId !== productId));
        alert("Item deleted successfully!");
      } catch (err) {
        console.error("Error deleting grocery item:", err);
        alert("Failed to delete item. Please try again later.");
      }
    }
    window.location.reload();
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text("Grocery List Management", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    let finalY = 20;
    const addSection = (title, category) => {
      const data = filteredData(category);
      if (data.length > 0) {
        doc.text(title, 10, finalY);
        autoTable(doc, {
          startY: finalY + 5,
          head: [["Name", "Category", "Quantity"]],
          body: data.map((item) => [item.name, item.categories[0], item.quantity]),
        });
        finalY = doc.lastAutoTable.finalY + 10;
      }
    };
    Categories.forEach((category) => {
      if (selectedCategories.includes("All") || selectedCategories.includes(category)) {
        addSection(category, category);
      }
    });
    doc.save("grocery_report.pdf");
  };

  const generateColorfulCSV = () => {
    const reportData = groceries.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.includes("All") || selectedCategories.some(cat => item.categories.includes(cat)))
    );
    
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Grocery Report</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table {border-collapse: collapse; width: 100%;}
          th {background-color: #1E5631; color: white; font-weight: bold; text-align: left; padding: 8px;}
          td {padding: 8px;}
          .fruit {background-color: #FFCCCB;}
          .vegetables {background-color: #90EE90;}
          .meat {background-color: #FFB6C1;}
          .dairy {background-color: #FFFACD;}
          .bakery {background-color: #E6E6FA;}
          .beverages {background-color: #ADD8E6;}
          .snacks {background-color: #FFD700;}
          .canned {background-color: #D3D3D3;}
        </style>
      </head>
      <body>
        <h2>Grocery List Report</h2>
        <table border="1">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
          ${reportData.map(item => {
            const category = item.categories[0].toLowerCase();
            const colorClass = 
              category === 'fruits' ? 'fruit' : 
              category === 'vegetables' ? 'vegetables' : 
              category === 'meat' ? 'meat' : 
              category === 'dairy' ? 'dairy' : 
              category === 'bakery' ? 'bakery' : 
              category === 'beverages' ? 'beverages' : 
              category === 'snacks' ? 'snacks' : 
              category === 'canned goods' ? 'canned' : '';
            
            return `
              <tr class="${colorClass}">
                <td>${item.name}</td>
                <td>${item.categories.join(", ")}</td>
                <td>${item.quantity}</td>
              </tr>
            `;
          }).join('')}
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "colorful_grocery_report.xls";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateReport = () => {
    const reportData = groceries.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.includes("All") || selectedCategories.some(cat => item.categories.includes(cat)))
    );
    const csvContent = [
      "Name,Category,Quantity",
      ...reportData.map(
        (item) =>
          `${item.name},${item.categories.join(",")},${item.quantity}`
      ),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grocery_report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleEdit = (productId) => {
    navigate(`/edit-grocery/${productId}`);
  };

  const getDisplayedCategoriesText = () => {
    if (selectedCategories.includes("All")) {
      return "All Categories";
    } else if (selectedCategories.length <= 2) {
      return selectedCategories.join(", ");
    } else {
      return `${selectedCategories.length} categories selected`;
    }
  };

  const handleCategoryChange = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories(prev => {
        if (prev.includes("All")) {
          return [category];
        } 
        const withoutAll = prev.filter(cat => cat !== "All");
        if (withoutAll.includes(category)) {
          const result = withoutAll.filter(cat => cat !== category);
          return result.length === 0 ? ["All"] : result;
        } else {
          return [...withoutAll, category];
        }
      });
    }
  };

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-green-100 to-green-800 text-green-900 overflow-hidden justify-center items-center">
      <div className="mt-10 p-10 w-screen">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Grocery List Management</h2>
          <p className="text-gray-600">Manage your grocery items efficiently</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center align-middle">
          <div className="flex  w-full flex-col md:flex-row items-center gap-4 mb-6 justify-center align-middle">
          <input
            type="text"
            placeholder="Search items..."
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div 
            className="relative border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 bg-white"
            onMouseEnter={() => setIsMenuExpanded(true)}
            onMouseLeave={() => setIsMenuExpanded(false)}
          >
            <div className="flex items-center mb-2 cursor-pointer justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="all-categories"
                  checked={selectedCategories.includes("All")}
                  onChange={() => handleCategoryChange("All")}
                  className="mr-2"
                />
                <label htmlFor="all-categories" className="font-medium">
                  {isMenuExpanded ? "All Categories" : getDisplayedCategoriesText()}
                </label>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isMenuExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-2 overflow-hidden transition-all duration-200 ${isMenuExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              {Categories.map((category) => (
                <div key={category} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category}`}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={generateReport}
            >
              Generate CSV
            </button>
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
              onClick={generateColorfulCSV}
            >
              Colorful Excel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={generatePdf}
            >
              Generate PDF
            </button>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/add-grocery")}
            >
              Add Item
            </button>
          </div>
        </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading groceries...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="space-y-10">
            {Categories.map(
              (category) =>
                (selectedCategories.includes("All") || selectedCategories.includes(category)) && (
                  <div key={category}>
                    <h3 className="text-xl text-black font-semibold mb-2">{category}</h3>
                    <table
                      className="min-w-full bg-white shadow-md rounded-lg overflow-hidden "
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderSpacing: "0",
                      }}
                    >
                      <thead>
                        <tr className="bg-green-900 text-white">
                          <th
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
                            style={{ width: "25%" }}
                          >
                            Name
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-200"
                            style={{ width: "25%" }}
                          >
                            Category
                          </th>
                          <th
                            className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-b border-gray-200"
                            style={{ width: "15%" }}
                          >
                            Quantity
                          </th>
                          <th
                            className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-b border-gray-200"
                            style={{ width: "15%" }}
                          >
                            Image
                          </th>
                          <th
                            className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider border-b border-gray-200"
                            style={{ width: "20%" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredData(category).length > 0 ? (
                          filteredData(category).map((item) => (
                            <tr key={item.productId} className="hover:bg-gray-50 transition-colors duration-150">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.categories.join(", ")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                {item.imageUrl ? (
                                  <img src={item.imageUrl} alt={item.name} className="h-12 w-12 object-cover rounded" />
                                ) : (
                                  <span className="text-gray-400">No Image</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <div className="flex justify-center gap-2">
                                  <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150"
                                    onClick={() => handleEdit(item.productId)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150"
                                    onClick={() => handleDelete(item.productId)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                              No {category} items found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceryListManagement;
