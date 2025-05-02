import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg flex justify-between items-center py-4 px-6 fixed top-0 left-0 right-0 z-10">
            <div className="flex items-center">
                <Link to="/" className="text-white text-2xl font-bold tracking-tight">Grocery<span className="text-yellow-300">List</span></Link>
            </div>
            <div className="flex gap-6">
                <Link to="/" className="text-white hover:text-yellow-300 transition duration-300 font-medium">Home</Link>
                <Link to="/grocery-list" className="text-white hover:text-yellow-300 transition duration-300 font-medium">My List</Link>
                <Link to="/add-grocery" className="text-white hover:text-yellow-300 transition duration-300 font-medium">Add Item</Link>
            </div>
        </nav>
    );
};

export default Navbar;