// pages/admin/dashboard.js
'use client'
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// Dummy analytics data, replace with your actual data
const analyticsData = {
  totalUsers: 1500,
  totalPatients: 1000,
  totalDoctors: 300,
  totalHospitals: 50,
  totalPharmacies: 150,
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("hospital");

  const adminName = "John Doe"; // Replace with the actual admin name

const analyticsCards = [
  {
    title: "Total Users",
    count: analyticsData.totalUsers,
    icon: "/medease/frontend/public/images/admin.png", // Replace with your actual image path
  },
  {
    title: "Total Patients",
    count: analyticsData.totalPatients,
    icon: "/medease/frontend/public/images/patient.png", // Replace with your actual image path
  },
  {
    title: "Total Doctors",
    count: analyticsData.totalDoctors,
    icon: "/medease/frontend/public/images/doctor.png", // Replace with your actual image path
  },
  {
    title: "Total Hospitals",
    count: analyticsData.totalHospitals,
    icon: "/medease/frontend/public/images/hospital.png", // Replace with your actual image path
  },
  {
    title: "Total Pharmacies",
    count: analyticsData.totalPharmacies,
    icon: "/medease/frontend/public/images/pharmacy.png", // Replace with your actual image path
  },
];

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  const handleCreateAccountClick = (accountType) => {
    setSelectedAccountType(accountType);
    setShowCreateAccountModal(true);
  };

  const handleCreateAccountModalClose = () => {
    setShowCreateAccountModal(false);
  };

  const handleCreateAccountSubmit = (formData) => {
    // Implement logic to handle form submission (e.g., send data to server)
    console.log(
      `Form submitted for ${selectedAccountType} with data:`,
      formData
    );
    // Close the modal after submission
    setShowCreateAccountModal(false);
  };

  const accountTypes = [
    {
      type: "hospital",
      title: "Create Hospital Account",
      icon: "/images/hospital.jpg",
    },
    {
      type: "doctor",
      title: "Create Doctor Account",
      icon: "/images/doctor.jpg",
    },
    {
      type: "pharmacy",
      title: "Create Pharmacy Account",
      icon: "/images/pharmacy.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-white p-4 bg-opacity-60 backdrop-blur-md shadow-md mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-blue-100">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 mr-4">Logged in as {adminName}</p>
            <button
              onClick={handleLogout}
              className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-6 py-3 rounded-md focus:outline-none transition duration-300`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("createAccount")}
            className={`${
              activeTab === "createAccount"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-6 py-3 rounded-md focus:outline-none transition duration-300`}
          >
            Create Account
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {analyticsCards.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-md shadow-md flex items-center justify-between transition duration-300 transform hover:scale-105"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-blue-500">
                    {card.count}
                  </p>
                </div>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "createAccount" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accountTypes.map((account, index) => (
              <div
                key={index}
                onClick={() => handleCreateAccountClick(account.type)}
                className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-between cursor-pointer transition duration-300 transform hover:scale-105"
              >
                <Image
                  src={account.icon}
                  alt={account.title}
                  width={150}
                  height={100}
                  className="mb-4 rounded-md"
                />
                <p className="text-lg font-semibold text-gray-700">
                  {account.title}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Create Account Modal */}
        {showCreateAccountModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="bg-white p-8 rounded-md shadow-md z-10">
              <h2 className="text-2xl font-semibold mb-4">
                Create{" "}
                {selectedAccountType === "hospital"
                  ? "Hospital"
                  : selectedAccountType === "doctor"
                  ? "Doctor"
                  : "Pharmacy"}{" "}
                Account
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Extract form data and pass it to the submit handler
                  const formData = new FormData(e.target);
                  const data = {};
                  formData.forEach((value, key) => {
                    data[key] = value;
                  });
                  handleCreateAccountSubmit(data);
                }}
              >
                {/* Add form fields here */}
                <div className="mb-4">
                  <label
                    htmlFor="accountName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {selectedAccountType === "hospital"
                      ? "Hospital"
                      : selectedAccountType === "doctor"
                      ? "Doctor"
                      : "Pharmacy"}{" "}
                    Name
                  </label>
                  <input
                    type="text"
                    id="accountName"
                    name="accountName"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="accountLocation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="accountLocation"
                    name="accountLocation"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* Add more form fields as needed */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCreateAccountModalClose}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
