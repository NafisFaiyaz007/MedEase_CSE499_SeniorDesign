"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../app/components/navbar";
import { create } from "ipfs-http-client";
import ViewProfile from "./viewProfile";
import UploadDocuments from "./uploadDocument";
import PatientDashboardHeader from "./patientDashboardHeader"


const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const patientName = "John Doe"; // Replace with the actual patient's name

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

// const handleRemoveFile = async (file)=>{
//   console.log("handle remove file")
// }
// const handleSendFile = async (file) => {
//   console.log("handle remove file");
// };
//   const handleUploadFile = async (file) => {
//     // Implement logic to upload the file
//     console.log("Uploading file:", file)
//   try {
//     // Read the file content
//     const fileBuffer = await file.arrayBuffer();

//     // Upload file to IPFS
//     const result = await ipfs.add({ content: fileBuffer });
//     const ipfsHash = result.cid.toString();

//     console.log("File uploaded to IPFS. IPFS Hash:", ipfsHash);

//     // Update state with the IPFS hash or perform further actions
//     setUploadedFiles((prevFiles) => [
//       ...prevFiles,
//       { name: file.name, ipfsHash },
//     ]);
//   } catch (error) {
//     console.error("Error uploading file to IPFS:", error);
//   }
//     setUploadedFiles((prevFiles) => [...prevFiles, file]);
//   };

//   const handleDownloadFile = async (file) => {
//     try {
//       // Fetch file from IPFS using its hash
//       const fileContent = await ipfs.cat(file.ipfsHash);

//       // Convert file content to a Blob
//       const blob = new Blob([fileContent], {
//         type: "application/octet-stream",
//       });

//       // Create a download link and trigger a click event to download the file
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = file.name;
//       link.click();
//     } catch (error) {
//       console.error("Error downloading file from IPFS:", error);
//     }
//   };
  // const handleViewProfile = () => {
  //   // Implement logic to view patient's profile
  //   console.log("Viewing patient profile");
  //   // You may want to navigate to a new page or update the state accordingly
  // };

  const handleBrowseDoctors = () => {
    // Implement logic to browse doctors
    console.log("Browsing doctors");
    // You may want to navigate to a new page or update the state accordingly
  };
  const [availableDoctors, setAvailableDoctors] = useState([
    {
      name: "Dr. Smith",
      designation: "Cardiologist",
      hospital: "City Hospital",
      description: "Specialized in heart-related issues.",
    },
    {
      name: "Dr. Johnson",
      designation: "Orthopedic Surgeon",
      hospital: "OrthoCare Center",
      description: "Expert in orthopedic surgeries and treatments.",
    },
    // Add more doctors as needed
  ]);
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

  // Dummy data for hospital beds, replace with actual data
  const hospitalBeds = [
    {
      name: "Hospital A",
      availableBeds: 20,
      description: "A description of Hospital A.",
    },
    {
      name: "Hospital B",
      availableBeds: 15,
      description: "A description of Hospital B.",
    },
    // Add more hospitals as needed
  ];

  const [editAccountForm, setEditAccountForm] = useState({
    editName: "",
    editAge: "",
    editAddress: "",
    editPhoneNumber: "",
    // Add more fields as needed
  });

  // ...

  const handleEditAccountChange = (e) => {
    const { name, value } = e.target;
    setEditAccountForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
      <Head>
        <title>Patient Dashboard</title>
      </Head>
      {/* Navbar */}
      <Navbar patientName={patientName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4 flex items-center justify-center">
        {/* Left half */}
        <PatientDashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right half */}
        <div className="flex-1">
          {/* Content based on active tab */}
          {activeTab === "viewProfile" && (
            <ViewProfile/>
          )}

          {activeTab === "uploadDocuments" && (
            <UploadDocuments
              // handleUploadFile={handleUploadFile}
              // uploadedFiles={uploadedFiles}
              // handleDownloadFile={handleDownloadFile}
              // handleRemoveFile={handleRemoveFile}
              // handleSendFile={handleSendFile}
            />
          )}

          {/* Add content for other tabs */}

          {activeTab === "browseDoctors" && (
            <div className="space-y-6">
              {/* <h2 className="text-xl font-semibold text-white mb-4 text-center">
                Browse Doctors
              </h2> */}
              {/* Grid of Cards for Doctors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {availableDoctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {doctor.designation} - {doctor.hospital}
                      </p>
                      <p className="text-gray-800">{doctor.description}</p>
                    </div>
                    <button
                      className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition duration-300 self-end"
                      onClick={() => handleSetAppointment(doctor)}
                    >
                      Set Appointment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "bookHospitalBed" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 text-center">
                Book Hospital Bed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {hospitalBeds.map((hospital, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {hospital.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        Available Beds: {hospital.availableBeds}
                      </p>
                      <p className="text-gray-800">{hospital.description}</p>
                    </div>
                    <button
                      className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition duration-300 self-end"
                      onClick={() => handleBookBed(hospital)}
                    >
                      Book Bed
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "editAccount" && (
            <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Edit Account
              </h2>
              {/* Edit Account Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="editName" className="text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="editName"
                    name="editName"
                    // Set the placeholder with the existing name
                    placeholder={patientData.name}
                    // Implement the onChange handler to update state
                    onChange={(e) => handleEditAccountChange(e)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="editAge" className="text-gray-700">
                    Age
                  </label>
                  <input
                    type="text"
                    id="editAge"
                    name="editAge"
                    placeholder={patientData.age}
                    onChange={(e) => handleEditAccountChange(e)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="editAddress" className="text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="editAddress"
                    name="editAddress"
                    placeholder={patientData.address}
                    onChange={(e) => handleEditAccountChange(e)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label htmlFor="editPhoneNumber" className="text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="editPhoneNumber"
                    name="editPhoneNumber"
                    placeholder={patientData.phoneNumber}
                    onChange={(e) => handleEditAccountChange(e)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
                  />
                </div>
                {/* Add more fields for other account information (gender, email, etc.) */}
                <div>
                  <button
                    type="button"
                    onClick={handleEditAccount}
                    className="w-full bg-purple-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-purple-700 transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

              {/* Delete Account Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* ...
    
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
