import React, { useState } from "react";
import InventoryTable from "../../assets/InventoryTable.png";

const inventoryData = [
  { name: "Milk", category: "Dairy", quantity: 10, expiry: "2025-06-20", status: "Sufficient" },
  { name: "Eggs", category: "Poultry", quantity: 3, expiry: "2024-04-15", status: "Low Stock" },
  { name: "Bread", category: "Bakery", quantity: 0, expiry: "2024-03-10", status: "Expired" },
  { name: "Apples", category: "Fruits", quantity: 15, expiry: "2025-07-01", status: "Sufficient" },
  { name: "Cheese", category: "Dairy", quantity: 2, expiry: "2024-05-10", status: "Low Stock" },
];

const statusColors = {
  Sufficient: "bg-green-600",
  "Low Stock": "bg-yellow-600",
  Expired: "bg-red-800",
};

const Inventorytable = () => {
    const [searchTerm, setSearchTerm] = useState("");

  const filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 bg-gray-100 p-10 rounded-lg shadow-xl">
      <div className="relative w-full lg:w-1/2 flex justify-center">
        <div className="relative w-80 h-70">
          <img
            src={InventoryTable}
            alt="Inventory"
            className="rounded-lg w-full max-w-sm mt-16"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-lg"></div>
        </div>
      </div>

      <div className="w-full lg:w-5/6 backdrop-blur-lg bg-white/70 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-900 mb-6">📦 Inventory Summary</h2>

        <input
          type="text"
          placeholder="🔍 Search items..."
          className="px-5 py-2 mb-6 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-green-900 shadow-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-green-600 to-green-800 text-white">
                <th className="p-3">Item Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b bg-white hover:bg-green-100 transition-all">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.expiry}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-white text-sm rounded ${statusColors[item.status]}`}>
                      {item.status === "Sufficient" ? "🟢" : item.status === "Low Stock" ? "🟡" : "🔴"} {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventorytable