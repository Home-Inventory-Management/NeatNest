import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaMicrophone, FaList } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const categoryQuantityMap = {
  Vegetables: "kg/g",
  Snacks: "number",
  Grocery: "number",
  Medicals: "number/card",
  Essentials: "kg/g",
};

const AddInventory = ({ onAddItem }) => {
    const [item, setItem] = useState({
        name: "",
        category: "",
        quantity: "",
        unit: "",
        expiryDate: "",
      });
      const [errors, setErrors] = useState({});
      const { transcript, listening } = useSpeechRecognition();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      };
    
  return (
    <div>
      <Header />
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto mt-10 mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-32 right-56">
          <Link to="/inventorylist">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center gap-2 text-lg font-semibold shadow-md transition"
            >
              <FaList /> Inventory List
            </motion.button>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-green-900 mb-4 text-center">Add New Inventory Item</h2>
        <form className="space-y-6">
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
          </div>

          <select
            name="category"
            value={item.category}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
          >
            <option value="">Select Category</option>
            {Object.keys(categoryQuantityMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
            required
          />

          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={item.expiryDate}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-50 shadow-inner text-green-700 py-3 rounded-2xl hover:shadow-lg active:shadow-inner focus:shadow-inner transition-all hover:bg-green-100 duration-200 ease-in-out"
          >
            Store
          </button>
        </form>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AddInventory