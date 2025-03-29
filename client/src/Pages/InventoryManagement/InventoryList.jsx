import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCheck, FaExclamationTriangle, FaBoxes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const items = [
  { id: 1, name: "Milk", category: "Fridge", quantity: 2, expiry: "2025-04-01", stock: 10 },
  { id: 2, name: "Rice", category: "Pantry", quantity: 5, expiry: "2025-05-12", stock: 80 },
  { id: 3, name: "Eggs", category: "Fridge", quantity: 12, expiry: "2025-03-30", stock: 20 },
  { id: 4, name: "Bread", category: "Pantry", quantity: 1, expiry: "2025-03-29", stock: 5 },
];

const categories = ["All", "Pantry", "Fridge", "Cleaning Supplies"];

const InventoryList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editableItem, setEditableItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleEdit = (id) => setEditableItem(id);
  const handleSave = () => setEditableItem(null);
  const handleDelete = (id) => setFilteredItems(filteredItems.filter((item) => item.id !== id));

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setFilteredItems(category === "All" ? items : items.filter((item) => item.category === category));
  };

  return (
    <div>
        <Header/>
    <section className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition ${
                  selectedCategory === cat ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Toggle View
          </button>
        </div>

        {/* Item List */}
        <div className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 gap-6" : "gap-4"}`}>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white shadow-md rounded-lg flex items-center justify-between"
            >
              {/* Item Info */}
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category} | Expiry: {item.expiry}</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2 relative">
                  <div
                    className={`h-2 rounded-full ${
                      item.stock <= 20 ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${item.stock}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {editableItem === item.id ? (
                  <button onClick={handleSave} className="text-green-600 text-lg">
                    <FaCheck />
                  </button>
                ) : (
                  <button onClick={() => handleEdit(item.id)} className="text-blue-500 text-lg">
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => handleDelete(item.id)} className="text-red-500 text-lg">
                  <FaTrashAlt />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Item Button */}
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
    <Footer/>
    </div>
  );
};

export default InventoryList
