import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa"; // Import a delete icon from a popular icon library

const DeleteAccount = () => {
  const [activeTab, setActiveTab] = useState("deleteAccount");
  const [users, setUsers] = useState([]);

  const accountTypes = [
    { type: 2, title: "Hospital", icon: "/hospital-icon.png" },
    { type: 4, title: "Patient", icon: "/patient-icon.png" },
    { type: 3, title: "Doctor", icon: "/doctor-icon.png" },
  ];

  // Function to delete a user by ID
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // If the user is deleted successfully, remove it from the state
        setUsers(users.filter((user) => user.id !== userId));
        console.log(`User with ID ${userId} deleted successfully`);
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/");
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <>
      {activeTab === "deleteAccount" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accountTypes.map((accountType) => (
            <div
              key={accountType.title}
              className="bg-white rounded-md overflow-hidden shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-4 capitalize p-4 bg-gray-500 text-white rounded-t-md">
                {accountType.title}s
              </h2>
              <table className="w-full text-gray-800 border border-gray-200">
                <thead className="bg-gray-300">
                  <tr>
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.userType === accountType.type)
                    .map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md focus:outline-none hover:bg-red-700 transition duration-300 flex items-center"
                          >
                            <FaTrash className="mr-2" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
