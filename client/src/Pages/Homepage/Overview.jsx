import React from 'react'
import CountUp from "react-countup";
import { FaBox, FaExclamationTriangle, FaClipboardList, FaShoppingCart, FaChartBar } from "react-icons/fa";

const data = [
  { label: "Total Items", value: 120, icon: FaBox, color: "text-blue-500", suffix: " Items in Inventory" },
  { label: "Low Stock Items", value: 5, icon: FaExclamationTriangle, color: "text-yellow-500", suffix: " Items Running Low" },
  { label: "Expired Items", value: 3, icon: FaClipboardList, color: "text-red-500", suffix: " Expired Items" },
  { label: "Grocery List Items", value: 7, icon: FaShoppingCart, color: "text-green-500", suffix: " Items in Grocery List" },
  { label: "Monthly Usage", value: 32, icon: FaChartBar, color: "text-purple-500", suffix: " Items Used This Month" },
];

const Overview = () => {
  return (
    <div className="text-white py-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-6 bg-green-900 rounded-xl shadow-lg">
            <item.icon className={`text-4xl ${item.color} mb-2`} />
            <p className="text-3xl font-bold">
              <CountUp end={item.value} duration={2.5} enableScrollSpy scrollSpyOnce />
            </p>
            <p className="text-gray-400 text-sm">{item.suffix}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview