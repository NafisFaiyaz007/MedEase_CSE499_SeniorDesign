// components/Navbar.js
import {React, useEffect, useState} from "react";
import Image from "next/image";
import axios from 'axios';
import { useRouter } from "next/navigation";

//import jwt_decode from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode' // import dependency




const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the JWT exists in local storage or wherever you store it
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the JWT to get user information
      const decoded = jwtDecode(token);

      // Set user information in state
      setUser(decoded);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/logout');
      
      // Handle the response (optional)
      console.log(response.data);
      localStorage.removeItem('jwt');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error if needed
    }
  
  };
  return (
    <nav className="bg-slate-200  px-6 py-0 shadow-md mb-4">
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
          <p className="text-black m-4">Logged in as  {(user != null) && user.name}</p>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-white font-bold bg-cyan-500 px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;