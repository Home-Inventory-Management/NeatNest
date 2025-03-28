import React, { useState, useEffect } from 'react';
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom'

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/homepage",
  },
  {
    id: 2,
    title: "Inventory",
    path: "/inventorydashboard",
  },
  {
    id: 3,
    title: "Grocery",
    link: "#",
  },
  {
    id: 4,
    title: "Analytics",
    link: "#",
  },
  {
    id: 5,
    title: "Notification",
    link: "#",
  },
];

const Header = () => {
  const [bgColor, setBgColor] = useState('transparent');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBgColor('#a5cfc1'); 
    } else {
      setBgColor('transparent');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full top-0 left-0 py-3 px-10 lg:px-20 flex justify-between items-center transition-all duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <div className="flex items-center ml-0">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
          <h1 className="font-extrabold text-2xl text-green-900">NeatNest</h1>
        </div>

        <div className="hidden lg:block">
          <ul className="flex items-center font-poppins gap-7">
            {NavbarMenu.map((menu) => (
              <motion.li key={menu.id} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <motion.a
                  href={menu.path}
                  className="inline-block py-2 px-3 text-gray-700 hover:text-green-900 transition-colors relative group"
                >
                  <div className="w-2 h-2 bg-[#69a79c] absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </motion.a>
              </motion.li>
            ))}

            <Link to="/">
              <button 
                type="submit"
                className="border border-green-500 text-green-700 px-5 py-2 rounded-full transition 
                hover:bg-green-200 hover:text-green-900 active:bg-[#a2dbcb] active:text-[#1ca981]"
              >
                Log Out
              </button>
            </Link>
          </ul>
        </div>

        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Header;
