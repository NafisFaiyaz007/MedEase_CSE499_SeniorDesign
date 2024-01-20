// components/Navbar.js
import React from "react";
import Image from "next/image";

const Navbar = ({ adminName, handleLogout }) => {
  return (
    <nav className="bg-slate-200 backdrop-blur-lg opacity-75 px-6 py-0 shadow-md mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Image Icon */}
          <div className="mr-2">
            <Image
              src="/images/logo.png"
              alt="Admin Icon"
              width={180}
              height={40}
            />
          </div>
      
         
        </div>
        {/* Logged-in User Info */}
        <div className="flex items-center">
          <p className="text-black m-4">Logged in as {adminName}</p>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;