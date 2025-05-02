import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const AddExpense = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: 1,
    date: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const API_URL = "http://localhost:5000/api/expenses";

  // Today's date in YYYY-MM-DD (for max on date input)
  const today = new Date().toISOString().slice(0, 10);

  // Fetch all expenses for duplicate/category check
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setExpenses(res.data))
      .catch(() => setExpenses([]));
  }, []);

  // Validation logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Expense Name is required";
      isValid = false;
    } else if (formData.productName.length < 3) {
      newErrors.productName = "Expense Name must be at least 3 characters";
      isValid = false;
    } else if (/\d/.test(formData.productName)) {
      newErrors.productName = "Expense Name cannot contain numbers";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
      isValid = false;
    } else if (
      !ALLOWED_CATEGORIES.includes(formData.category.toLowerCase())
    ) {
      newErrors.category = "Invalid category";
      isValid = false;
    }

    const quantity = parseInt(formData.quantity, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
      newErrors.quantity = "Quantity must be between 1 and 100";
      isValid = false;
    }

    const price = parseFloat(formData.price);
    if (formData.price === "") {
      newErrors.price = "Price is required";
      isValid = false;
    } else if (isNaN(price) || price < 0) {
      newErrors.price = "Price must be a non-negative number";
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
      isValid = false;
    } else if (isNaN(Date.parse(formData.date))) {
      newErrors.date = "Please enter a valid date";
      isValid = false;
    } else if (formData.date > today) {
      newErrors.date = "Future dates are not allowed";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Auto-select category if name matches previous expense
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "productName") {
      const match = expenses.find(
        (exp) =>
          exp.name.trim().toLowerCase() === value.trim().toLowerCase()
      );
      if (match) {
        newFormData.category = match.category.toLowerCase();
      }
    }

    setFormData(newFormData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check for duplicate name (case-insensitive)
    const duplicate = expenses.find(
      (item) =>
        item.name.trim().toLowerCase() ===
        formData.productName.trim().toLowerCase()
    );

    if (duplicate) {
      const proceed = window.confirm(
        "An expense with this name already exists. Do you want to add it anyway?"
      );
      if (!proceed) return;
    }

    try {
      setIsSubmitting(true);

      const expenseData = {
        name: formData.productName.trim(),
        category:
          formData.category.charAt(0).toUpperCase() +
          formData.category.slice(1),
        quantity: parseInt(formData.quantity, 10),
        date: formData.date,
        price: parseFloat(formData.price),
      };

      await axios.post(API_URL, expenseData);

      setFormData({
        productName: "",
        category: "",
        quantity: 1,
        date: "",
        price: "",
      });
      setErrors({});
      alert("Expense Added Successfully");
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
        setErrors({ api: "Failed to add expense. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-100 to-green-800 text-black overflow-hidden justify-center items-center">
      <div className="backdrop-blur-3xl bg-gray-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="mb-4">
          <button
            className="text-blue-500 hover:text-blue-700 font-medium"
            onClick={() => navigate("/expense-list")}
          >
            Back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Add Expense
        </h1>
        <p className="text-gray-600 mb-6">
          Here, You Can Add Some New Expenses.
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
                errors.productName ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.productName}
              onChange={handleChange}
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
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
                errors.category ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
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
                errors.quantity ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
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
                errors.price ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
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
              max={today}
              className={`w-full border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
          {/* API Error */}
          {errors.api && (
            <p className="text-red-500 text-sm mt-2">{errors.api}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting
                ? "bg-blue-300"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isSubmitting ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
