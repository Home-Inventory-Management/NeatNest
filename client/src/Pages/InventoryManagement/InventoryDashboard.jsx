import React from "react";
import {
  FaBoxOpen,
  FaClock,
  FaExclamationTriangle,
  FaPlus,
  FaClipboardList,
  FaEdit,
  FaTrashAlt,
  FaLightbulb,
  FaAppleAlt,
  FaCarrot,
  FaDrumstickBite,
  FaBreadSlice,
  FaCheese,
  FaGlassWhiskey,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const summaryCards = [
  {
    title: "Total Items",
    value: 120,
    icon: <FaBoxOpen className="text-blue-500" />,
    color: "bg-blue-100",
  },
  {
    title: "Expiring Soon",
    value: 8,
    icon: <FaClock className="text-yellow-500" />,
    color: "bg-yellow-100",
  },
  {
    title: "Low Stock",
    value: 5,
    icon: <FaExclamationTriangle className="text-red-500" />,
    color: "bg-red-100",
  },
  {
    title: "Recently Added",
    value: 12,
    icon: <FaBoxOpen className="text-green-500" />,
    color: "bg-green-100",
  },
];

const quickActions = [
  {
    name: "Add Item",
    icon: <FaPlus />,
    bg: "bg-green-500",
    path: "/addinventory",
  },
  {
    name: "Inventory List",
    icon: <FaClipboardList />,
    bg: "bg-blue-500",
    path: "/inventorylist",
  },
];

const activities = [
  {
    text: "Tomatoes added to inventory.",
    time: "Just now",
    icon: <FaEdit className="text-green-500" />,
  },
  {
    text: "Rice quantity updated.",
    time: "10 min ago",
    icon: <FaEdit className="text-blue-500" />,
  },
  {
    text: "Expired milk removed.",
    time: "2 hrs ago",
    icon: <FaTrashAlt className="text-red-500" />,
  },
];

const recommendations = [
  {
    text: "Restock Milk - Low Quantity",
    icon: <FaLightbulb className="text-yellow-500" />,
  },
  {
    text: "Buy Eggs - Frequently Used",
    icon: <FaLightbulb className="text-green-500" />,
  },
];

const InventoryDashboard = () => {
  return (
    <div>
      <Header />
      <section className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {summaryCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`p-5 ${card.color} rounded-lg shadow-md flex flex-col items-center`}
              >
                <div className="text-3xl">{card.icon}</div>
                <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
                <p className="text-xl font-bold">{card.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-6 my-8">
            {quickActions.map((action, index) => (
              <Link to={action.path} key={index}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className={`px-8 py-3 ${action.bg} text-white rounded-lg flex items-center gap-2 text-lg font-semibold shadow-md transition`}
                >
                  {action.icon} {action.name}
                </motion.button>
              </Link>
            ))}
          </div>

          <div className="bg-white shadow-md rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="🔍 Search items..."
              className="border border-green-700 rounded-full focus:outline-none focus:ring-1 focus:ring-green-900 shadow-md px-5 py-2 w-full md:w-2/3"
            />
            <select className="border border-green-700 rounded-md px-4 py-2">
              <option>By Category</option>
              <option>By Expiry Date</option>
              <option>Recently Used</option>
            </select>
          </div>

          <section className="min-h-screen">
            <div className="max-w-6xl mx-auto">
              <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12">
                <div className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

                <div className="absolute top-28 left-40 text-5xl text-green-600 opacity-50">
                  🍎
                </div>
                <div className="absolute top-32 right-60 text-5xl text-orange-600 opacity-60">
                  🥕
                </div>
                <div className="absolute top-26 left-20 text-5xl text-brown-600 opacity-60">
                  🍞
                </div>
                <div className="absolute top-52 right-70 text-5xl text-yellow-600 opacity-60">
                  🧀
                </div>
                <div className="absolute top-38 right-12 text-5xl text-red-600 opacity-60">
                  🍗
                </div>

                <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-40"></div>

                <div className="absolute bottom-40 left-0 text-5xl text-gray-300 opacity-80">
                  🥛
                </div>
                <div className="absolute bottom-32 right-80 text-5xl text-gray-500 opacity-60">
                  🐟
                </div>
                <div className="absolute bottom-16 left-32 text-5xl text-gray-700 opacity-60">
                  🥬
                </div>

                <div className="max-w-2xl w-full rounded-2xl p-6 relative z-10 flex justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-green-900 mb-4">
                      📌 Recent Activity
                    </h2>
                    <div className="space-y-4 border-l-4 border-gray-300 pl-6">
                      {activities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          className="flex items-center gap-4 p-3 rounded-lg transition hover:shadow-lg"
                        >
                          <div className="text-2xl">{activity.icon}</div>
                          <div>
                            <p className="text-gray-700 font-medium">
                              {activity.text}
                            </p>
                            <span className="text-sm text-gray-500">
                              {activity.time}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl w-full rounded-2xl p-6 mt-8 relative z-10 flex justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-green-900 mb-4">
                      💡 Smart Recommendations
                    </h2>
                    <div className="space-y-4 border-l-4 border-green-300 pl-6">
                      {recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          className="flex items-center gap-4 p-3 rounded-lg transition hover:shadow-lg"
                        >
                          <div className="text-2xl">{rec.icon}</div>
                          <p className="text-gray-700 font-medium">
                            {rec.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default InventoryDashboard;
