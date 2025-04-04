import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const GroceryListManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const Categories = ["Fruits", "Vegetables", "Meats", "Juices"];

  const dummyData = [
    { productId: 1, name: "Apple", categories: ["Fruits"], price: 2.99, quantity: 5 },
    { productId: 2, name: "Banana", categories: ["Fruits"], price: 1.49, quantity: 8 },
    { productId: 3, name: "Orange", categories: ["Fruits"], price: 3.99, quantity: 6 },
    { productId: 4, name: "Grapes", categories: ["Fruits"], price: 3.00, quantity: 4 },
    { productId: 5, name: "Guava", categories: ["Fruits"], price: 2.99, quantity: 3 },
    { productId: 6, name: "PineApple", categories: ["Fruits"], price: 1.02, quantity: 1 },
    { productId: 7, name: "Carrot", categories: ["Vegetables"], price: 0.99, quantity: 10 },
    { productId: 8, name: "Broccoli", categories: ["Vegetables"], price: 1.99, quantity: 7 },
    { productId: 9, name: "Spinach", categories: ["Vegetables"], price: 2.49, quantity: 9 },
    { productId: 10, name: "Beetroot", categories: ["Vegetables"], price: 2.50, quantity: 3 },
    { productId: 11, name: "Onions", categories: ["Vegetables"], price: 2.00, quantity: 5 },
    { productId: 12, name: "Drumsticks", categories: ["Vegetables"], price: 1.02, quantity: 3 },
    { productId: 13, name: "Chicken", categories: ["Meats"], price: 5.99, quantity: 4 },
    { productId: 14, name: "Beef", categories: ["Meats"], price: 7.99, quantity: 3 },
    { productId: 15, name: "Pork", categories: ["Meats"], price: 6.49, quantity: 5 },
    { productId: 16, name: "Mutton", categories: ["Meats"], price: 5.69, quantity: 4 },
    { productId: 17, name: "Dryfish", categories: ["Meats"], price: 2.69, quantity: 3.5 },
    { productId: 18, name: "Seafoods", categories: ["Meats"], price: 10.69, quantity: 10 },
    { productId: 19, name: "Milk", categories: ["Juices"], price: 5.0, quantity: "4L" },
    { productId: 20, name: "Wine", categories: ["Juices"], price: 7.78, quantity: "2L" },
    { productId: 21, name: "Orange Juice", categories: ["Juices"], price: 6.25, quantity: "6L" },
    { productId: 22, name: "CocoCola", categories: ["Juices"], price: 2.42, quantity: "2.5L" },
    { productId: 23, name: "Beer", categories: ["Juices"], price: 4.00, quantity: "3 Bottle" },
    { productId: 24, name: "Whisky", categories: ["Juices"], price: 10.25, quantity: "1 Bottle" },
  ];

  const filteredData = (category) => {
    return dummyData.filter(
      (item) =>
        item.categories.includes(category) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || item.categories.includes(selectedCategory))
    );
  };

  const handleDelete = (productId) => {
    const productName = dummyData.find(item => item.productId === productId).name;
    const confirmDelete = window.confirm(`Are you sure you want to delete this item : ${productName} ?`);
    if (confirmDelete) {
      // Implement the actual deletion logic here
      console.log(`Deleting item with ID: ${productId}`);
    }
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
          head: [["Name", "Price", "Quantity"]],
          body: data.map((item) => [item.name, `$${item.price}`, item.quantity]),
        });
        finalY = doc.lastAutoTable.finalY + 10;
      }
    };

    Categories.forEach((category) => {
      if (selectedCategory === "All" || selectedCategory === category) {
        addSection(category, category);
      }
    });

    doc.save("grocery_report.pdf");
  };

  const generateReport = () => {
    const reportData = dummyData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || item.categories.includes(selectedCategory))
    );

    const csvContent = [
      "Name,Category,Price,Quantity",
      ...reportData.map(
        (item) =>
          `${item.name},${item.categories.join(",")},$${item.price},${item.quantity}`
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

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-green-100 to-green-800 text-green-900 overflow-hidden justify-center items-center">
     <div className="mt-10 p-10 w-screen">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Grocery List Management</h2>
        <p className="text-gray-600">Manage your grocery items efficiently</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center align-middle">
        <input
          type="text"
          placeholder="Search items..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {Categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={generateReport}
          >
            Generate CSV
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

      <div className="space-y-10">
        {Categories.map(
          (category) =>
            (selectedCategory === "All" || selectedCategory === category) && (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
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
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider border-b border-gray-200"
                        style={{ width: "25%" }}
                      >
                        Name
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider border-b border-gray-200"
                        style={{ width: "25%" }}
                      >
                        Category
                      </th>
                      <th
                        className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider border-b border-gray-200"
                        style={{ width: "15%" }}
                      >
                        Price
                      </th>
                      <th
                        className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider border-b border-gray-200"
                        style={{ width: "15%" }}
                      >
                        Quantity
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
                    {filteredData(category).map((item) => (
                      <tr key={item.productId} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.categories.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">
                          {item.quantity}
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
                    ))}
                  </tbody>
                </table>
              </div>
            )
        )}
      </div>
    </div>
    </div>
);
};

export default GroceryListManagement;
