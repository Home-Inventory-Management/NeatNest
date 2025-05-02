import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ALLOWED_CATEGORIES = [
  "fruits",
  "vegetables",
  "meat",
  "dairy",
  "bakery",
  "beverages",
  "snacks",
  "canned goods",
];

const EditExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: 1,
    date: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = "http://localhost:5000/api/expenses";

  useEffect(() => {
    const fetchExpenseItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        const data = response.data;

        let categoryValue = "";
        if (data.category) {
          if (Array.isArray(data.category) && data.category.length > 0) {
            categoryValue = data.category[0].toLowerCase();
          } else if (typeof data.category === "string") {
            categoryValue = data.category.toLowerCase();
          }
        }

        setFormData({
          productName: data.name || "",
          category: categoryValue,
          quantity: data.quantity || 1,
          date: data.date ? data.date.slice(0, 10) : "", // for input[type="date"]
          price: data.price !== undefined && data.price !== null ? data.price : "",
        });
      } catch (error) {
        console.error("Error fetching expense:", error);
        alert("Could not fetch the expense.");
        navigate("/expense-list");
      }
    };
    fetchExpenseItem();
  }, [id, navigate]);

  const validateForm = () => {
    let newErrors = {};

    // Expense Name
    if (!formData.productName.trim()) {
      newErrors.productName = "Expense Name is required.";
    } else if (formData.productName.length < 3) {
      newErrors.productName = "Expense Name must be at least 3 characters.";
    } else if (/\d/.test(formData.productName)) {
      newErrors.productName = "Expense Name cannot contain numbers.";
    }

    // Category
    if (!formData.category) {
      newErrors.category = "Please select a category.";
    } else if (!ALLOWED_CATEGORIES.includes(formData.category.toLowerCase())) {
      newErrors.category = "Invalid category.";
    }

    // Quantity
    const quantity = parseInt(formData.quantity, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
      newErrors.quantity = "Quantity must be between 1 and 100.";
    }

    // Price
    const price = parseFloat(formData.price);
    if (formData.price === "") {
      newErrors.price = "Price is required.";
    } else if (isNaN(price) || price < 0) {
      newErrors.price = "Price must be a non-negative number.";
    }

    // Date
    if (!formData.date) {
      newErrors.date = "Date is required.";
    } else if (isNaN(Date.parse(formData.date))) {
      newErrors.date = "Please enter a valid date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";

    // Live Validation
    if (name === "productName") {
      if (!value.trim()) {
        errorMsg = "Expense Name is required.";
      } else if (value.length < 3) {
        errorMsg = "Expense Name must be at least 3 characters.";
      } else if (/\d/.test(value)) {
        errorMsg = "Expense Name cannot contain numbers.";
      }
    } else if (name === "category") {
      if (!value) {
        errorMsg = "Please select a category.";
      } else if (!ALLOWED_CATEGORIES.includes(value.toLowerCase())) {
        errorMsg = "Invalid category.";
      }
    } else if (name === "quantity") {
      const quantity = parseInt(value, 10);
      if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        errorMsg = "Quantity must be between 1 and 100.";
      }
    } else if (name === "price") {
      const price = parseFloat(value);
      if (value === "") {
        errorMsg = "Price is required.";
      } else if (isNaN(price) || price < 0) {
        errorMsg = "Price must be a non-negative number.";
      }
    } else if (name === "date") {
      if (!value) {
        errorMsg = "Date is required.";
      } else if (isNaN(Date.parse(value))) {
        errorMsg = "Please enter a valid date.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const updatedItem = {
      name: formData.productName.trim(),
      category:
        formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
      quantity: parseInt(formData.quantity, 10),
      date: formData.date,
      price: parseFloat(formData.price),
    };

    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);

      alert("Expense Updated Successfully!");
      navigate("/expense-list");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        (error.response.data.errors || error.response.data.message)
      ) {
        setErrors(
          error.response.data.errors || { api: error.response.data.message }
        );
      } else {
        setErrors({ api: "Failed to update expense. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-green-100 to-green-800 text-green-900 overflow-hidden justify-center items-center">
      <div className="backdrop-blur-3xl flex justify-center items-center bg-gray-100 rounded-2xl">
        <div className="backdrop-blur-2xl bg-opacity-50 shadow-md rounded-lg p-8 w-full max-w-md">
          <div className="mb-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/expense-list")}
            >
              Back
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-2">Edit Expense Item</h1>
          <p className="text-gray-600 mb-6">
            Update the expense item details below
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Expense Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expense Name *
              </label>
              <input
                type="text"
                name="productName"
                className={`w-full border ${
                  errors.productName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.productName}
                onChange={handleChange}
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName}</p>
              )}
            </div>
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                className={`w-full border ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                {ALLOWED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>
            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="100"
                className={`w-full border ${
                  errors.quantity
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                className={`w-full border ${
                  errors.price
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                className={`w-full border ${
                  errors.date
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.date}
                onChange={handleChange}
                required
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>
            {/* API Error */}
            {errors.api && (
              <p className="text-red-500 text-sm">{errors.api}</p>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Expense"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
