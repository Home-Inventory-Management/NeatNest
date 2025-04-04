import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddGrocery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: 1,
  });

  const [errors, setErrors] = useState({
    productName: "",
    category: "",
    quantity: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      productName: "",
      category: "",
      quantity: "",
    };

    // Validate product name (no numbers allowed)
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
      isValid = false;
    } else if (formData.productName.length < 3) {
      newErrors.productName = "Product name must be at least 3 characters";
      isValid = false;
    } else if (/\d/.test(formData.productName)) {
      newErrors.productName = "Product name cannot contain numbers";
      isValid = false;
    }

    // Validate category
    if (!formData.category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }

    // Validate quantity
    const quantity = parseInt(formData.quantity, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
      newErrors.quantity = "Quantity must be between 1 and 100";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMsg = "";
    if (name === "productName") {
      if (!value.trim()) {
        errorMsg = "Product name is required";
      } else if (value.length < 3) {
        errorMsg = "Product name must be at least 3 characters";
      } else if (/\d/.test(value)) {
        errorMsg = "Product name cannot contain numbers";
      }
    } else if (name === "category") {
      if (!value) {
        errorMsg = "Please select a category";
      }
    } else if (name === "quantity") {
      const quantity = parseInt(value, 10);
      if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        errorMsg = "Quantity must be between 1 and 100";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Form data:", formData);
    setFormData({
      productName: "",
      category: "",
      quantity: 1,
    });
    setErrors({
      productName: "",
      category: "",
      quantity: "",
    });

    alert("Grocery Added Successfully");
    navigate("/grocery-list");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-green-100 to-green-800 text-black overflow-hidden justify-center items-center">
      <div className="backdrop-blur-3xl bg-gray-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
        <div className="mb-4">
          <button className="text-blue-500 hover:text-blue-700 font-medium" onClick={() => navigate("/grocery-list")}>
            Back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Add Grocery Item</h1>
        <p className="text-gray-600 mb-6">Here, You Can Add Some New Groceries.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="productName"
              className={`w-full border ${errors.productName ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.productName}
              onChange={handleChange}
            />
            {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              className={`w-full border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="meat">Meat</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
            <input
              type="number"
              name="quantity"
              min="1"
              max="100"
              className={`w-full border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Grocery
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGrocery;
