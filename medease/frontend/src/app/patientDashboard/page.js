"use client";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../app/components/navbar";
// pages/patient/dashboard.js
// ... (previous imports and code)

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
    email: "john.doe@example.com",
    upcomingAppointments: [
      {
        doctor: "Dr. Smith",
        date: "2023-12-20",
        time: "10:00 AM",
      },
      // Add more appointments as needed
    ],
  });
  const patientName = "John Doe"; // Replace with the actual patient's name

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  const handleUploadFile = (file) => {
    // Implement logic to upload the file
    console.log("Uploading file:", file);
    // You may want to make an API call or update the state accordingly
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleViewProfile = () => {
    // Implement logic to view patient's profile
    console.log("Viewing patient profile");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleBrowseDoctors = () => {
    // Implement logic to browse doctors
    console.log("Browsing doctors");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleBookAppointment = () => {
    // Implement logic to book an appointment
    console.log("Booking an appointment");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleBookHospitalBed = () => {
    // Implement logic to book a hospital bed
    console.log("Booking a hospital bed");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleMakePayment = () => {
    // Implement logic to make a payment
    console.log("Making a payment");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleEditAccount = () => {
    // Implement logic to edit the account
    console.log("Editing account");
    // You may want to navigate to a new page or update the state accordingly
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the account
    console.log("Deleting account");
    // You may want to show a confirmation modal and proceed accordingly
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Patient Dashboard</title>
      </Head>
      {/* Navbar */}
      <Navbar patientName={patientName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4 flex items-center justify-center">
        {/* Left half */}
        <div className="flex flex-col items-start mr-8">
          {/* Patient Dashboard Text */}
          <h1 className="text-3xl font-semibold my-6 text-white">
            Patient Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setActiveTab("viewProfile")}
              className={`${
                activeTab === "viewProfile"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              View Profile
            </button>
            <button
              onClick={() => setActiveTab("uploadDocuments")}
              className={`${
                activeTab === "uploadDocuments"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Upload/View Documents
            </button>
            <button
              onClick={() => setActiveTab("browseDoctors")}
              className={`${
                activeTab === "browseDoctors"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Browse Doctors
            </button>
            <button
              onClick={() => setActiveTab("bookAppointment")}
              className={`${
                activeTab === "bookAppointment"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab("bookHospitalBed")}
              className={`${
                activeTab === "bookHospitalBed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Book Hospital Bed
            </button>
            <button
              onClick={() => setActiveTab("makePayment")}
              className={`${
                activeTab === "makePayment"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Make Payment
            </button>
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
              onClick={() => setActiveTab("deleteAccount")}
              className={`${
                activeTab === "deleteAccount"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-red-700 hover:text-white transition duration-300`}
            >
              Delete Account
            </button>
            {/* Add more tabs for other use cases */}
          </div>
        </div>

        {/* Right half */}
        <div className="flex-1">
          {/* Content based on active tab */}
          {activeTab === "viewProfile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 text-center">
                View Profile
              </h2>
              {/* Implement your logic for displaying and editing patient profile */}
              {/* Personal Information Section */}
              {/* Personal Information Section */}
              <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">
                      <strong>Name:</strong> {patientData.name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Age:</strong> {patientData.age}
                    </p>
                    <p className="text-gray-700">
                      <strong>Gender:</strong> {patientData.gender}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {patientData.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments Section */}
              {patientData.upcomingAppointments.length > 0 && (
                <div className="bg-white p-6 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Upcoming Appointments:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {patientData.upcomingAppointments.map(
                      (appointment, index) => (
                        <li key={index} className="mb-2">
                          <strong>Doctor:</strong> {appointment.doctor},{" "}
                          <strong>Date:</strong> {appointment.date},{" "}
                          <strong>Time:</strong> {appointment.time}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "uploadDocuments" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 text-center">
                Upload/View Documents
              </h2>
              {/* Upload File Section */}
              <div className="mb-4">
                <label htmlFor="fileInput" className="block text-white mb-2">
                  Choose File:
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => handleUploadFile(e.target.files[0])}
                  className="border p-2"
                />
              </div>
              {/* View Uploaded Files Section */}
              {uploadedFiles.length > 0 && (
                <div className="bg-white p-4 rounded-md shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Uploaded Files:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {uploadedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="mb-2 flex items-center justify-between"
                      >
                        <span>{file.name}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            className="bg-purple-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                            onClick={() => handleDownloadFile(file)}
                          >
                            Download
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                            onClick={() => handleRemoveFile(index)}
                          >
                            Remove
                          </button>
                          <button
                            className="bg-green-700 text-white px-2 py-1 rounded-md hover:bg-green-700"
                            onClick={() => handleSendFile(file)}
                          >
                            Send
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Add content for other tabs */}
          {/* ...

          {activeTab === "browseDoctors" && (
            // Implement content for "Browse Doctors" tab
          )}

          {activeTab === "bookAppointment" && (
            // Implement content for "Book Appointment" tab
          )}

          {activeTab === "bookHospitalBed" && (
            // Implement content for "Book Hospital Bed" tab
          )}

          {activeTab === "makePayment" && (
            // Implement content for "Make Payment" tab
          )}

          {activeTab === "editAccount" && (
            // Implement content for "Edit Account" tab
          )}

          {activeTab === "deleteAccount" && (
            // Implement content for "Delete Account" tab
          )}

          ... */}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
