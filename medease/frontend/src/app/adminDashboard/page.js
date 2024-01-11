// pages/admin/dashboard.js
'use client'
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import axios from 'axios';


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
    icon: "/images/admin.png", // Replace with your actual image path
  },
  {
    title: "Total Patients",
    count: analyticsData.totalPatients,
    icon: "/images/patient.png", // Replace with your actual image path
  },
  {
    title: "Total Doctors",
    count: analyticsData.totalDoctors,
    icon: "/images/doctor.png", // Replace with your actual image path
  },
  {
    title: "Total Hospitals",
    count: analyticsData.totalHospitals,
    icon: "/images/hospital.png", // Replace with your actual image path
  },
  {
    title: "Total Pharmacies",
    count: analyticsData.totalPharmacies,
    icon: "/images/pharmacy.png", // Replace with your actual image path
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

  const handleCreateAccountSubmit = async (formData) => {
    // Implement logic to handle form submission (e.g., send data to server)
    try {
      let uType = 5;
      if(selectedAccountType.toLocaleLowerCase() === 'hospital')
        uType = 2
      else if(selectedAccountType.toLowerCase() === 'doctor')
        uType = 3;
      console.log(formData);
      const response = await axios.post('http://localhost:8000/api/users/register', {
        ...formData,
        "userType": uType,   
      });

      console.log(response.data);
      // Handle success or redirect to login page
    } catch (error) {
      if (error.response) {
        // The server responded with a status code other than 2xx
        console.error('Registration error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request', error.message);
      }}
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
      icon: "/images/hospital.png",
      
    },
    {
      type: "doctor",
      title: "Create Doctor Account",
      icon: "/images/doctor.png",
    },
    {
      type: "pharmacy",
      title: "Create Pharmacy Account",
      icon: "/images/pharmacy.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      {/* Navbar */}
      {/* Navbar Component */}
      <Navbar adminName={adminName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4">
        {/* Admin Dashboard Text */}
        <h1 className="text-3xl font-semibold my-6 text-white">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-6 py-3 rounded-md focus:outline-none  hover:bg-blue-800 hover:text-white transition duration-300`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("createAccount")}
            className={`${
              activeTab === "createAccount"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
          >
            Create Account
          </button>

          <button
            onClick={() => setActiveTab("DeleteAccount")}
            className={`${
              activeTab === "createAccount"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
          >
            Delete Account
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
                className="bg-white hover:bg-gray-400 p-6 rounded-md shadow-md flex flex-col items-center justify-between cursor-pointer transition duration-300 transform hover:scale-105"
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
                    htmlFor="name"
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
                    id="name"
                    name="name"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {selectedAccountType === "hospital"
                      ? "Hospital"
                      : selectedAccountType === "doctor"
                      ? "Doctor"
                      : "Pharmacy"}{" "}
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* Add more form fields as needed */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCreateAccountModalClose}
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-300 focus:outline-none transition duration-300"
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
