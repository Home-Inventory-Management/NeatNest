import React from 'react'
import { FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const activities = [
  { type: "added", text: "Tomatoes added to inventory.", time: "Just now", icon: <FaPlusCircle className="text-green-500" /> },
  { type: "updated", text: "Rice quantity updated.", time: "10 min ago", icon: <FaEdit className="text-blue-500" /> },
  { type: "deleted", text: "Expired milk removed.", time: "2 hrs ago", icon: <FaTrashAlt className="text-red-500" /> },
];

const RecentActivity = () => {
  return (
    <section className="relative bg-gray-100 py-12 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-2/3 bg-gradient-to-br from-green-200 to-transparent opacity-80 rounded-bl-full pointer-events-none"></div>
      <div className="relative max-w-3xl mx-auto rounded-lg p-0 z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📌 Recent Activity Log</h2>
        
        <div className="space-y-4 border-l-4 border-gray-300 pl-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center gap-5 p-3"
            >
              <div className="text-2xl">{activity.icon}</div>
              <div>
                <p className="text-gray-700 font-medium">{activity.text}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentActivity