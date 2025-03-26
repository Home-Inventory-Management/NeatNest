import React from 'react'
import { FaBell } from "react-icons/fa";
import { motion } from "framer-motion";

import Avatar1 from "../../assets/avatar1.jpg";
import Avatar2 from "../../assets/avatar2.jpg";
import Avatar3 from "../../assets/avatar3.jpg";
import Avatar4 from "../../assets/avatar4.jpg";
import Avatar5 from "../../assets/avatar5.jpg";

const avatars = [
  { src: Avatar1, style: "top-24 left-36" },
  { src: Avatar2, style: "top-20 right-44" },
  { src: Avatar3, style: "bottom-24 left-64" },
  { src: Avatar4, style: "bottom-28 right-28" },
  { src: Avatar5, style: "top-52 right-72" },
];
  
const Recommendations = () => {
  return (
    <section className="relative bg-white py-20">
      {avatars.map((avatar, index) => (
        <motion.img
          key={index}
          src={avatar.src}
          alt="User"
          className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg ${avatar.style}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        />
      ))}

      <div className="container mx-auto flex flex-col items-center text-center px-6">

      <div className="mt-6 bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-lg text-white shadow-lg">
            <h2 className="text-xl font-semibold">Smart Insights 🔥</h2>
            <ul className="mt-3 space-y-2 text-gray-100">
              <li>🛒 <strong>You might need to buy:</strong> Milk, Bread</li>
              <li>🌤 <strong>Seasonal Suggestion:</strong> Buy sunscreen for summer</li>
              <li>⏳ <strong>Predicted Expiry Alert:</strong> Milk expires in 3 days</li>
              <li>🍌 <strong>Fresh Tip:</strong> Bananas best before 3 days</li>
              <li>📦 <strong>Restock Reminder:</strong> Order essentials soon</li>
            </ul>
          </div>

        <a
          href="#"
          className="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-full text-lg font-medium shadow-md hover:bg-yellow-600 transition-all duration-300"
        >
          Set Reminders
          <FaBell className="animate-pulse text-xl" />
        </a>
      </div>
    </section>
  );
};

export default Recommendations