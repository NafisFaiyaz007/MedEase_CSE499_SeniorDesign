// pages/hospital/dashboard.js
"use client";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../app/components/navbar";
import axios from "axios"; // Import axios for making HTTP requests

// Dummy data, replace with actual data
const hospitalData = {
  totalPatients: 120,
  totalDoctors: 15,
  totalAppointments: 80,
  totalBedsAvailable: 30,
};



const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [doctorForm, setDoctorForm] = useState({
    doctorName: "",
    specialization: "",
  });
  const [bedsCounter, setBedsCounter] = useState(0);

  const hospitalName = "Hospital XYZ"; // Replace with the actual hospital name

  const analyticsCards = [
    {
      title: "Total Patients",
      count: hospitalData.totalPatients,
      icon: "/images/patients.png", // Replace with your actual image path
    },
    {
      title: "Total Doctors",
      count: hospitalData.totalDoctors,
      icon: "/images/doctor.png", // Replace with your actual image path
    },
    {
      title: "Total Appointments",
      count: hospitalData.totalAppointments,
      icon: "/images/appointment.png", // Replace with your actual image path
    },
    {
      title: "Total Beds Available",
      count: hospitalData.totalBedsAvailable,
      icon: "/images/bed.png", // Replace with your actual image path
    },
  ];

  const [admissionsToApprove, setAdmissionsToApprove] = useState([
    // Dummy data, replace with actual admissions data
    { patientName: "John Doe", reason: "Emergency", date: "2023-12-20" },
    { patientName: "Jane Smith", reason: "Surgery", date: "2023-12-21" },
    // Add more admissions as needed
  ]);

  const handleApproveAdmission = (admission) => {
    // Implement logic to approve the admission
    console.log("Approving admission:", admission);
    // You may want to make an API call or update the state accordingly
  };

  const handleRejectAdmission = (admission) => {
    // Implement logic to reject the admission
    console.log("Rejecting admission:", admission);
    // You may want to make an API call or update the state accordingly
  };

  // Sample data for the list of doctors (replace with actual data)
  const doctorList = [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Dr. Johnson" },
    // Add more doctors as needed
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDeleteDoctor = () => {
    if (selectedDoctor) {
      // Implement logic to delete the selected doctor
      console.log("Deleting doctor:", selectedDoctor);
      // You may want to make an API call or update the state accordingly
      // For simplicity, let's clear the selected doctor after deletion
      setSelectedDoctor(null);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  const handleDoctorFormChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCreateDoctor = async () => {
    try {
      console.log(doctorForm);
      // Send a POST request to your backend API to create a new doctor
      const response = await axios.post("http://localhost:8000/api/users/register", ...doctorForm);

      // Handle success - clear the form and display a success message
      console.log("Doctor created successfully:", response.data);
      setDoctorForm({
        doctorName: "",
        degree: "",
        specialization: "",
        phoneNumber: "",
        hospital: "",
        designation: "",
        age: "",
      });
      // Optionally, you can display a success message to the user
    } catch (error) {
      // Handle error - display an error message to the user
      console.error("Error creating doctor:", error);
      // Optionally, you can display an error message to the user
    }
  };

  const handleBedsCounterIncrement = () => {
    setBedsCounter((prevCounter) => prevCounter + 1);
  };

  const handleBedsCounterDecrement = () => {
    if (bedsCounter > 0) {
      setBedsCounter((prevCounter) => prevCounter - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Hospital Dashboard</title>
      </Head>
      {/* Navbar */}
      <Navbar hospitalName={hospitalName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4 flex items-center justify-center">
        {/* Left half */}
        <div className="flex flex-col items-start mr-8">
          {/* Hospital Dashboard Text */}
          <h1 className="text-3xl font-semibold my-6 text-white">
            Hospital Dashboard
          </h1>

          {/* Tabs */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`${
                activeTab === "dashboard"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Dashboard
            </button>
            {/* Add more tabs for other cases */}
            <button
              onClick={() => setActiveTab("createDoctor")}
              className={`${
                activeTab === "createDoctor"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Create Doctor
            </button>

            <button
              onClick={() => setActiveTab("deleteDoctor")}
              className={`${
                activeTab === "deleteDoctor"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Delete Doctor
            </button>
            <button
              onClick={() => setActiveTab("updateBeds")}
              className={`${
                activeTab === "updateBeds"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Update Beds
            </button>
            <button
              onClick={() => setActiveTab("approveAdmission")}
              className={`${
                activeTab === "approveAdmission"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Approve Admission
            </button>
          </div>
        </div>

        {/* Right half */}
        <div className="flex-1">
          {/* Content based on active tab */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {/* Analytics Cards */}
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

          {/* Create Doctor Form */}
          {activeTab === "createDoctor" && (
            <div className="space-y-10 w-80">
              <h2 className="text-xl font-semibold text-white mb-4">
                Create Doctor
              </h2>
              <form className="flex flex-col space-y-2">
                <label htmlFor="doctorName" className="text-white">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={doctorForm.doctorName}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <label htmlFor="degree" className="text-white">
                  {" "}
                  {/* New field: Degree */}
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={doctorForm.degree}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <label htmlFor="specialization" className="text-white">
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={doctorForm.specialization}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <label htmlFor="phoneNumber" className="text-white">
                  {" "}
                  {/* New field: Phone Number */}
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={doctorForm.phoneNumber}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <label htmlFor="hospital" className="text-white">
                  {" "}
                  {/* New field: Hospital */}
                  Hospital
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={doctorForm.hospital}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <label htmlFor="designation" className="text-white">
                  {" "}
                  {/* New field: Designation */}
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={doctorForm.designation}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <label htmlFor="age" className="text-white">
                  {" "}
                  {/* New field: Age */}
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={doctorForm.age}
                  onChange={handleDoctorFormChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
                <button
                  type="button"
                  onClick={handleCreateDoctor}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
                >
                  Create Doctor
                </button>
              </form>
            </div>
          )}

          {/* Update Beds Counter */}
          {activeTab === "updateBeds" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Update Beds Counter
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBedsCounterDecrement}
                  className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                >
                  -
                </button>
                <p className="text-white">{bedsCounter}</p>
                <button
                  onClick={handleBedsCounterIncrement}
                  className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
                >
                  +
                </button>
              </div>
              <button
                // onClick={update}
                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
              >
                Update
              </button>
            </div>
          )}

          {activeTab === "approveAdmission" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 text-center">
                Approve Admissions
              </h2>

              {/* List of Admissions to Approve */}
              {admissionsToApprove.length > 0 ? (
                <ul className="space-y-4">
                  {admissionsToApprove.map((admission, index) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          {admission.patientName}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Reason: {admission.reason}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date: {admission.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-700 transition duration-300"
                          onClick={() => handleApproveAdmission(admission)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                          onClick={() => handleRejectAdmission(admission)}
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white text-center">
                  No admissions to approve.
                </p>
              )}
            </div>
          )}

          {/* Delete Doctor Section */}
          {activeTab === "deleteDoctor" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Delete Doctor
              </h2>
              {/* List of Doctors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {doctorList.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105`}
                  >
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {doctor.name}
                    </h3>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDoctorSelection(doctor)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                    >
                      Delete Doctor
                    </button>
                  </div>
                ))}
              </div>
              {/* Delete Button */}
              {selectedDoctor && (
                <button
                  onClick={handleDeleteDoctor}
                  className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
                >
                  Delete Selected Doctor
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
