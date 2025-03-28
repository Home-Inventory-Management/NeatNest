import { useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Logo from "../../assets/Logo.png"; 

const categoryQuantityMap = {
  Vegetables: "kg/g",
  Snacks: "number",
  Grocery: "number",
  Medicals: "number/card",
  Essentials: "kg/g",
};

const autoSuggestions = ["Milk", "Tea Powder", "Sugar", "Pepper", "Salt", "Turmeric"];

const AddInventory = ({ onAddItem }) => {
  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    expiryDate: "",
  });
  const [errors, setErrors] = useState({});
  const [showLogo, setShowLogo] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setItem({
      ...item,
      category,
      quantity: "",
      unit: categoryQuantityMap[category] || "number",
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!item.name) newErrors.name = "Item name is required";
    if (autoSuggestions.includes(item.name) && item.category !== "Essentials") {
      newErrors.category = `Category should be 'Essentials' for ${item.name}`;
    }

    if (!item.category) newErrors.category = "Category is required";
    if (!item.quantity || item.quantity <= 0) newErrors.quantity = "Quantity must be a positive number";

    if (!item.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const expiryDate = new Date(item.expiryDate);
      const currentDate = new Date();
      if (expiryDate <= currentDate) {
        newErrors.expiryDate = "Expiry date must be in the future";
      }
    }

    if (item.unit === "kg/g" && !/^\d+(\.\d{1,2})?$/g.test(item.quantity)) {
      newErrors.quantity = "Please enter a valid quantity (e.g., 50g, 100g)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setShowLogo(true);
    setTimeout(() => {
      setShowLogo(false);
      setItem({ name: "", category: "", quantity: "", unit: "", expiryDate: "", notes: "" });
    }, 1000);

    onAddItem(item);
  };

  return (
    <div>
      <Header />
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto mt-10 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {showLogo ? (
          <div className="flex justify-center">
            <img src={Logo} alt="Logo" className="w-90 h-90 animate-fadeInOut" />
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-green-900 mb-4 text-center">Add New Inventory Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={transcript || item.name}
                  onChange={handleChange}
                  className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  className={`absolute right-4 top-4 text-xl ${listening ? "text-red-400" : "text-green-600"}`}
                  onClick={() => SpeechRecognition.startListening({ continuous: false })}
                >
                  <FaMicrophone />
                </button>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <select
                name="category"
                value={item.category}
                onChange={handleCategoryChange}
                className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
              >
                <option value="">Select Category</option>
                {Object.keys(categoryQuantityMap).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
                required
              />
              {item.unit && <span className="text-gray-600">({item.unit})</span>}
              {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

              <input
                type="date"
                name="expiryDate"
                placeholder="Expiry Date"
                value={item.expiryDate}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
                required
              />
              {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}

              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={item.notes}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-green-50 shadow-inner text-green-700 py-3 rounded-2xl hover:shadow-lg active:shadow-inner focus:shadow-inner transition-all hover:bg-green-100 duration-200 ease-in-out"
              >
                Store
              </button>
            </form>
          </>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default AddInventory;
