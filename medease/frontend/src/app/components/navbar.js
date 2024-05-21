// // components/Navbar.js
// import {React, useEffect, useState} from "react";
// import Image from "next/image";
// import axios from 'axios';
// import { useRouter } from "next/navigation";

// //import jwt_decode from 'jsonwebtoken';
// import { jwtDecode } from 'jwt-decode' // import dependency


// const Navbar = () => {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/users/info', {withCredentials: true})
//     .then(response => setUser(response.data))
//     .catch(error => console.error('Error fetching user:', error));
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/users/logout', null, {withCredentials: true});
      
//       // Handle the response (optional)
//       console.log(response.data);
//       // localStorage.removeItem('jwt');
//       router.push('/login');
//     } catch (error) {
//       console.error('Logout failed', error);
//       // Handle error if needed
//     }
  
//   };
//   return (
//     <nav className="bg-slate-200  px-6 py-0 shadow-md mb-4">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           {/* Image Icon */}
//           <div className="mr-2">
//             <Image
//               src="/images/logo.png"
//               alt="Admin Icon"
//               width={180}
//               height={40}
//             />
//           </div>
      
         
//         </div>
//         {/* Logged-in User Info */}
//         <div className="flex items-center">
//           <p className="text-black m-4">Logged in as  {(user != null) && user.name}</p>
//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="text-white font-bold bg-cyan-500 px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from 'axios';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/info', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user:', error));
      
    // Fetch notifications
    axios.get('http://localhost:8000/api/users/notifications', { withCredentials: true })
      .then(response =>{setNotifications(response.data)
        console.log(response)
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/logout', null, { withCredentials: true });
      
      // Handle the response (optional)
      console.log(response.data);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error if needed
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="bg-slate-200 px-6 py-0 shadow-md mb-4">
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
          <div className="relative">
            {/* Notifications Button */}
            <button
              onClick={toggleNotifications}
              className="relative text-black font-bold bg-white px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Notifications
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50">
                <ul className="divide-y divide-gray-200">
                  {notifications.length > 0 && notifications.map((notification, index) => (
                    <li key={index} className="px-4 py-2 text-sm text-gray-700">
                      {notification.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <p className="text-black m-4">Logged in as {(user != null) && user.name}</p>
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
