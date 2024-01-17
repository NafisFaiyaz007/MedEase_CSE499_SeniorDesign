// pages/doctor/dashboard.js

"use client"
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../app/components/navbar";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("editAccount");

  const doctorName = "Dr. John Doe"; // Replace with the actual doctor's name

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Doctor Dashboard</title>
      </Head>
      {/* Navbar */}
      <Navbar adminName={doctorName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4 flex items-center justify-center">
        {/* Left half */}
        <div className="flex flex-col items-start mr-8">
          {/* Doctor Dashboard Text */}
          <h1 className="text-3xl font-semibold my-6 text-white">
            Doctor Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setActiveTab("editAccount")}
              className={`${
                activeTab === "editAccount"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Edit Account
            </button>
            <button
              onClick={() => setActiveTab("setAvailability")}
              className={`${
                activeTab === "setAvailability"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Set Availability
            </button>
            <button
              onClick={() => setActiveTab("deleteAccount")}
              className={`${
                activeTab === "deleteAccount"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Delete Account
            </button>
            <button
              onClick={() => setActiveTab("checkPatientList")}
              className={`${
                activeTab === "checkPatientList"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Check Patient List
            </button>
            <button
              onClick={() => setActiveTab("viewSchedule")}
              className={`${
                activeTab === "viewSchedule"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              View Schedule
            </button>
            <button
              onClick={() => setActiveTab("setPhysicalAppointment")}
              className={`${
                activeTab === "setPhysicalAppointment"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Set Physical Appointment
            </button>
          </div>
        </div>

        {/* Right half */}
        <div className="flex-1">
          {/* Content based on active tab */}
          {activeTab === "editAccount" && (
            <div className="space-y-10 w-80">
              <h2 className="text-xl font-semibold text-white mb-4">
                Edit Account
              </h2>
              <form className="flex flex-col space-y-2">
                {/* Add account edit fields here */}
                <label htmlFor="doctorName" className="text-white">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={doctorName}
                  // Add onChange and value props based on your implementation
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                {/* Add more fields for editing */}
                <button
                  // onClick={handleEditAccount}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Set Availability */}
          {activeTab === "setAvailability" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Set Availability
              </h2>
              {/* Add content for setting availability */}
            </div>
          )}

          {/* Delete Account */}
          {activeTab === "deleteAccount" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Delete Account
              </h2>
              {/* Add content for deleting account */}
            </div>
          )}

          {/* Check Patient List */}
          {activeTab === "checkPatientList" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Check Patient List
              </h2>
              {/* Add content for checking patient list */}
            </div>
          )}

          {/* View Schedule */}
          {activeTab === "viewSchedule" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                View Schedule
              </h2>
              {/* Add content for viewing schedule */}
            </div>
          )}

          {/* Set Physical Appointment */}
          {activeTab === "setPhysicalAppointment" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Set Physical Appointment
              </h2>
              {/* Add content for setting physical appointment */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
