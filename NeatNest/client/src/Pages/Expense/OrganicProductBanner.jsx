import React from "react";
import { useNavigate } from "react-router-dom";
const OrganicProductBanner = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/expense-list");
  };

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-green-100 to-green-800 text-white overflow-hidden justify-center items-center">
    <div className="relative bg-opacity-50  w-full max-w-6xl mx-auto p-6 bg-green-50 rounded-2xl shadow-xl">
      <div className="bg-opacity-50 relative flex flex-col md:flex-row items-center bg-green-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="md:w-1/2 w-full relative overflow-hidden p-6 backdrop-blur-3xl order-1 md:order-none">
          <img
            src="b1.jpg"
            alt="Organic Products"
          >
          </img>
        </div>
        {/* Text Content */}
        <div className="md:w-1/2 w-full p-8 md:p-12 space-y-6">
          <div className="text-center md:text-left">
            <p className="text-green-900 text-lg font-bold text-violet-600 mb-2 animate-fade-in">
              Fresh And Organic
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
              Your Daily Need Products
            </h2>
          </div>

          <button
            onClick={() => handleStart()}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Get Started
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrganicProductBanner;