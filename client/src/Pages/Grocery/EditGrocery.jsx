import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditGrocery = ({ onUpdate }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: 1,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchGroceryItem = async () => {
      try {
        const response = await fetch(`/api/grocery/${productId}`);
        const data = await response.json();
        setFormData({
          productName: data.name,
          category: data.categories[0].toLowerCase(),
          quantity: data.quantity,
        });
      } catch (error) {
        console.error("Error fetching grocery item:", error);
      }
    };

    fetchGroceryItem();
  }, [productId]);

  // Validation Function
  const validateForm = () => {
    let newErrors = {};

    // Validate product name (No numbers, minimum 3 characters)
    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required.";
    } else if (formData.productName.length < 3) {
      newErrors.productName = "Product name must be at least 3 characters.";
    } else if (/\d/.test(formData.productName)) {
      newErrors.productName = "Product name cannot contain numbers.";
    }

    // Validate category (Must be selected)
    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    // Validate quantity (Between 1 and 100)
    const quantity = parseInt(formData.quantity, 10);
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
      newErrors.quantity = "Quantity must be between 1 and 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMsg = "";

    // Live Validation
    if (name === "productName") {
      if (!value.trim()) {
        errorMsg = "Product name is required.";
      } else if (value.length < 3) {
        errorMsg = "Product name must be at least 3 characters.";
      } else if (/\d/.test(value)) {
        errorMsg = "Product name cannot contain numbers.";
      }
    } else if (name === "category" && !value) {
      errorMsg = "Please select a category.";
    } else if (name === "quantity") {
      const quantity = parseInt(value, 10);
      if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        errorMsg = "Quantity must be between 1 and 100.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedItem = {
      productId: parseInt(productId),
      name: formData.productName,
      categories: [formData.category.charAt(0).toUpperCase() + formData.category.slice(1)],
      price: 0,
      quantity: parseInt(formData.quantity, 10),
    };

    onUpdate(updatedItem);

    // Ensure alert shows only after successful validation
    setTimeout(() => {
      alert("Grocery Updated Successfully!");
      navigate("/grocery-list");
    }); // Small delay to allow UI updates
  };

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-green-100 to-green-800 text-green-900 overflow-hidden justify-center items-center">
      <div className="backdrop-blur-3xl flex justify-center items-center bg-gray-100 rounded-2xl">
        <div className="backdrop-blur-2xl bg-opacity-50 shadow-md rounded-lg p-8 w-full max-w-md">
          <div className="mb-4">
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/grocery-list")}>
              Back
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-2">Edit Grocery Item</h1>
          <p className="text-gray-600 mb-6">Update the grocery item details below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                name="productName"
                className={`w-full border ${errors.productName ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.productName}
                onChange={handleChange}
              />
              {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                className={`w-full border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="100"
                className={`w-full border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Update Grocery
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGrocery;
