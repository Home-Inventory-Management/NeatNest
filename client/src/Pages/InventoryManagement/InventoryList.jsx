import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaCheck,
  FaExclamationTriangle,
  FaBoxes,
  FaPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const items = [
  {
    id: 1,
    name: "Milk",
    category: "Fridge",
    quantity: 2,
    expiry: "2025-04-01",
    stock: 10,
  },
  {
    id: 2,
    name: "Rice",
    category: "Pantry",
    quantity: 5,
    expiry: "2025-05-12",
    stock: 80,
  },
  {
    id: 3,
    name: "Eggs",
    category: "Fridge",
    quantity: 12,
    expiry: "2025-03-30",
    stock: 20,
  },
  {
    id: 4,
    name: "Bread",
    category: "Pantry",
    quantity: 1,
    expiry: "2025-03-29",
    stock: 5,
  },
  {
    id: 5,
    name: "Apple",
    category: "Fruits",
    quantity: 1,
    expiry: "2025-04-07",
    stock: 75,
  },
  {
    id: 6,
    name: "Juices",
    category: "Beverages",
    quantity: 1,
    expiry: "2025-04-25",
    stock: 60,
  },
  {
    id: 7,
    name: "sauces",
    category: "Condiments",
    quantity: 1,
    expiry: "2026-02-12",
    stock: 90,
  },
  {
    id: 8,
    name: "oils",
    category: "Condiments",
    quantity: 2,
    expiry: "2025-07-05",
    stock: 17,
  },
  {
    id: 9,
    name: "shampoo",
    category: "Personal Care",
    quantity: 4,
    expiry: "2026-08-17",
    stock: 35,
  },
  {
    id: 10,
    name: "soap",
    category: "Personal Care",
    quantity: 8,
    expiry: "2026-06-24",
    stock: 49,
  },
];

const predefinedCategories = [
  "All",
  "Pantry",
  "Fridge",
  "Cleaning Supplies",
  "Frozen",
  "Beverages",
  "Snacks",
  "Condiments",
  "Household Items",
  "Personal Care",
  "Vegetables",
  "Fruits",
  "Spices",
];

const InventoryList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editableItem, setEditableItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const [newExpiry, setNewExpiry] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [categories, setCategories] = useState(predefinedCategories);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleEdit = (id) => {
    const item = filteredItems.find((item) => item.id === id);
    setEditableItem(id);
    setNewExpiry(item.expiry);
    setNewQuantity(item.quantity);
  };

  const [quantityError, setQuantityError] = useState("");
  const [expiryError, setExpiryError] = useState("");

  const handleSave = (id) => {
    setQuantityError("");
    setExpiryError("");

    const today = new Date().toISOString().split("T")[0]; 

    if (newQuantity < 0 || isNaN(newQuantity)) {
      setQuantityError("Uh-oh! Enter a valid quantity🚫");
      return;
    }

    if (newExpiry <= today) {
      setExpiryError("No time travel! Pick a future date🚀");
      return;
    }
    setFilteredItems(
      filteredItems.map((item) =>
        item.id === id
          ? {
              ...item,
              expiry: newExpiry,
              quantity: newQuantity,
              stock: newQuantity * 2,
            } 
          : item
      )
    );
    setEditableItem(null);
  };

  const handleDelete = (id) =>
    setFilteredItems(filteredItems.filter((item) => item.id !== id));

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setFilteredItems(
      category === "All"
        ? items
        : items.filter((item) => item.category === category)
    );
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory(""); 
      setIsAddingCategory(false);
    }
  };

  return (
    <div>
      <Header />
      <section className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-wrap gap-4 py-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300 transform hover:scale-105 ${
                    selectedCategory === cat
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <div className="flex gap-2 items-center">
                {isAddingCategory ? (
                  <>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category"
                      className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200 text-sm"
                    />
                    <button
                      onClick={handleAddCategory}
                      className="bg-green-500 text-white p-2 rounded-lg"
                    >
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAddingCategory(true)}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              Toggle View
            </button>
          </div>

          <div
            className={`grid ${
              viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 gap-6" : "gap-4"
            }`}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.category} | Expiry: {item.expiry}
                  </p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2 relative">
                    <div
                      className={`h-2 rounded-full ${
                        item.stock <= 20 ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${(item.stock / 100) * 100}%` }} 
                    ></div>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  {editableItem === item.id ? (
                    <div className="flex items-center gap-2">
                      <div>
                        <input
                          type="number"
                          value={newQuantity}
                          onChange={(e) => setNewQuantity(e.target.value)}
                          className="w-24 p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200 text-sm"
                        />
                        {quantityError && (
                          <p className="text-red-400 text-xs mt-1">
                            {quantityError}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="date"
                          value={newExpiry}
                          onChange={(e) => setNewExpiry(e.target.value)}
                          className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200 text-sm"
                        />
                        {expiryError && (
                          <p className="text-red-500 text-xs mt-1">
                            {expiryError}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleSave(item.id)}
                        className="text-green-600 text-lg ml-2"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-500 text-lg"
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-lg"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link to="/addinventory">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg flex items-center gap-2 text-lg font-semibold shadow-md transition"
              >
                <FaBoxes /> Add New Item
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InventoryList;
