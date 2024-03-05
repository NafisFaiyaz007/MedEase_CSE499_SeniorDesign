import React, { useState, useEffect } from "react";
import Image from "next/image";

const DeleteAccount = () => {
  const [activeTab, setActiveTab] = useState("deleteAccount");
  const [users, setUsers] = useState([]);

  const accountTypes = [
    { type: "hospital", title: "Hospital", icon: "/hospital-icon.png" },
    { type: "patient", title: "Patient", icon: "/patient-icon.png" },
    { type: "doctor", title: "Doctor", icon: "/doctor-icon.png" },
  ];

  const handleDeleteUser = (userId) => {
    // Implement your delete user logic here
    console.log(`Deleting user with ID ${userId}`);
  };

  const handleCreateAccountClick = (accountType) => {
    // Implement your create account logic here
    console.log(`Creating account for ${accountType}`);
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users"); // Replace with your actual endpoint
        const data = await response.json();
        setUsers(data);
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
          {["hospital", "patient", "doctor"].map((accountType) => (
            <div key={accountType}>
              <h2 className="text-2xl font-semibold mb-4 capitalize">
                {accountType}s
              </h2>
              <table className="w-full text-gray-800 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden">
                <thead>
                  <tr className="text-gray-800 bg-gray-100">
                    <th className="py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.type === accountType)
                    .map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{user.name}</td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                          >
                            Delete
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
