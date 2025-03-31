import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";
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
    
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        if (name === "name" && !/^[A-Za-z\s]*$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            name: "Item name can only contain letters and spaces!",
          }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      
        setItem((prev) => {
          if (name === "name" && value === "") {
            return { ...prev, name: value, category: "", quantity: "", expiryDate: "" };
          }
          return { ...prev, [name]: value };
        });
      };
      

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", item);
        const validationErrors = {};
    
        if (!item.name) {
          validationErrors.name = "Item name can't be empty😬";
          validationErrors.category = "Choose a category after naming the item!";
          validationErrors.quantity = "Don't forget to specify the quantity!";
          validationErrors.expiryDate = "Oops! Set a future expiry date🕒";
        } else if (!/^[A-Za-z\s]*$/.test(item.name)) {
          validationErrors.name = "Item name can only contain letters and spaces!";
        }
        if (!item.category && item.name) {
          validationErrors.category = "Please select a category for the item!";
        }
        if (!item.quantity || item.quantity <= 0) {
          validationErrors.quantity = "Uh-oh! Enter a valid quantity🚫";
        } else if (item.quantity < 0) {
          validationErrors.quantity = "Hold on! Negative quantities aren't allowed🚫";
        }
        if (!item.expiryDate) {
          validationErrors.expiryDate = "Set a future date for expiry⏳";
        } else if (new Date(item.expiryDate) < new Date()) {
          validationErrors.expiryDate = "No time travel! Pick a future date🚀";
        }
    
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
       }
    
       if (onAddItem) {
          onAddItem(item); 
       } else {
          console.warn("onAddItem function is not provided!");
       }
    
       setItem({ name: "", category: "", quantity: "", unit: "", expiryDate: "" });
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={item.name}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <select
            name="category"
            value={item.category}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
            required
            disabled={!item.name}
            >
              <option value="">Select Category</option>
              <option value="Pantry">Pantry</option>
              <option value="Fridge">Fridge</option>
              <option value="Cleaning Supplies">Cleaning Supplies</option>
              <option value="Frozen">Frozen</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
              <option value="Condiments">Condiments</option>
              <option value="Household Items">Household Items</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Spices">Spices</option>
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
            disabled={!item.category}
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

          <input
            type="date"
            name="expiryDate"
            placeholder="Expiry Date"
            value={item.expiryDate}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-gray-100 shadow-inner outline-none hover:shadow-none focus:shadow-none active:shadow-none active:translate-y-1 transition-all duration-200"
            required
            disabled={!item.quantity}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}

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