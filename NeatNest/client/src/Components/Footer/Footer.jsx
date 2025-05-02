import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-end items-center px-8 py-16 relative bg-green-900 text-gray-300">
      <div className="absolute inset-8 bg-gradient-to-t from-black via-black/80 to-black/0 z-0 rounded-2xl overflow-hidden"></div>
      <div className="flex flex-wrap w-full justify-evenly z-10 ">
        <div className="flex flex-col items-start space-y-2 w-1/4">
          <h3 className="text-xl font-semibold">NeatNest</h3>
          <p>
            Made with <span className="text-red-500">❤</span> by Y3S2-WE-157
          </p>
          <div className="flex space-x-3">
            <a href="#" target="_blank" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded">
              <img src="https://assets.codepen.io/9051928/codepen_1.png" alt="CodePen" className="h-5" />
            </a>
            <a href="#" target="_blank" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded">
              <img src="https://assets.codepen.io/9051928/x.png" alt="Twitter" className="h-5" />
            </a>
            <a href="#" target="_blank" className="w-8 h-8 flex items-center justify-center bg-white/10 rounded">
              <img src="https://assets.codepen.io/9051928/youtube_1.png" alt="YouTube" className="h-5" />
            </a>
          </div>
          <p className="text-sm text-gray-500">2025 © All Rights Reserved</p>
        </div>
        <div className="flex flex-col space-y-2 w-1/4 bg-green-800 p-4 rounded-2xl">
          <p>Our Mission</p>
          <p>Minimize waste with smart tracking.</p>
          <p>Save time with personalized suggestions.</p>
          <p>Enable sustainable and cost-effective shopping.</p>
        </div>
        <div className="flex flex-col space-y-2 w-1/4 bg-green-800 p-4 rounded-2xl">
          <p>Our Vision</p>
          <p>Simplify expense management.</p>
          <p>Keep households stocked with essentials.</p>
          <p>Reduce waste and promote efficient shopping.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
