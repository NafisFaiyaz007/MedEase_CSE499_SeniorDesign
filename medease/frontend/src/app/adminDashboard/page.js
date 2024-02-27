// pages/admin/dashboard.js
'use client'
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import axios from 'axios';
import AnalyticsCard from "./analyticsCard";
import CreateAccountForm from "./createAccountForm";



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("hospital");

  const adminName = "John Doe"; // Replace with the actual admin name


  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

   
  const handleCreateAccountClick = (accountType) => {
    setSelectedAccountType(accountType);
    setShowCreateAccountModal(true);
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
    // {
    //   type: "pharmacy",
    //   title: "Create Pharmacy Account",
    //   icon: "/images/pharmacy.png",
    // },
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
              activeTab === "deleteAccount"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
          >
            Delete Account
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "dashboard" && <AnalyticsCard />}

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
            <div className="bg-gray-300 p-4 md:p-8 rounded-md shadow-md z-10 w-full max-w-md md:max-w-xl lg:max-w-2xl max-h-full overflow-y-auto">
              {/* Add a close button if needed */}
              {/* <button
        onClick={() => setShowCreateAccountModal(false)}
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 cursor-pointer"
      >
        &#10005;
    </button> */}
              <CreateAccountForm
                selectedAccountType={selectedAccountType}
                showCreateAccountModal={showCreateAccountModal}
                setShowCreateAccountModal={setShowCreateAccountModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
