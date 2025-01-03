// pages/hospital/dashboard.js
"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../app/components/navbar";
import axios from "axios"; // Import axios for making HTTP requests
import CreateDoctorForm from "./createDoctorForm";
import UpdateBedsCounter from "./updateBedsCounter";
import DoctorList from "./DoctorList";
import PatientList from "./patientList"
import ApproveAdmission from "./approveAdmission";
import * as hospitalFunction from "./hospitalFunctions"
import PendingRegistration from "./pendingRegistration";

// Dummy data, replace with actual data
// const hospitalData = {
//   totalPatients: 120,
//   totalDoctors: 15,
//   totalAppointments: 80,
//   totalBedsAvailable: 30,
// };



const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const [hospitalData, setHospitalData] = useState(false);

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
    // {
    //   title: "Total Appointments",
    //   // count: hospitalData.totalAppointments,
    //   icon: "/images/appointment.png", // Replace with your actual image path
    // },
    {
      title: "Total Beds Available",
      count: hospitalData.beds,
      icon: "/images/bed.png", // Replace with your actual image path
    },
  ];

  useEffect(() => {
    // Fetch doctor list when the component mounts
    const fetchData = async () => {
      const data = await hospitalFunction.fetchAnalytics();
      setHospitalData(data);
    };

    fetchData();
  }, []);

   const handlePatientSelection = (patient) => {
     console.log("Selected Patient:", patient);
     // Implement your logic for handling patient selection here
   };

   const handleDeletePatient = async (patient) => {
     console.log("Deleting Patient:", patient);
     // Implement your logic for deleting a patient here
   };
 const handleLogout = () => {
  // Implement your logout logic here
  console.log("Logout clicked");
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-cyan-700">
      <Head>
        <title>Hospital Dashboard</title>
      </Head>
      {/* Navbar */}
      <Navbar hospitalName={hospitalName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4 flex font-semibold items-center justify-center">
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
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              Dashboard
            </button>
            {/* Add more tabs for other cases */}
            <button
              onClick={() => setActiveTab("createDoctor")}
              className={`${
                activeTab === "createDoctor"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              Create Doctor
            </button>

            <button
              onClick={() => setActiveTab("doctorList")}
              className={`${
                activeTab === "doctorList"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              View Doctors
            </button>
            {/* patient List */}
            <button
              onClick={() => setActiveTab("patientList")}
              className={`${
                activeTab === "patientList"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              View Patients
            </button>
            <button
              onClick={() => setActiveTab("updateBeds")}
              className={`${
                activeTab === "updateBeds"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              Update Beds
            </button>
            {/* <button
              onClick={() => setActiveTab("approveAdmission")}
              className={`${
                activeTab === "approveAdmission"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              Approve Admission
            </button> */}
            <button
              onClick={() => setActiveTab("pendingPatients")}
              className={`${
                activeTab === "pendingPatients"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-cyan-600 hover:text-white transition duration-300`}
            >
              Pending Patients
            </button>
          </div>
        </div>

        {/* Right half */}
        <div className="flex-1">
          {/* Content based on active tab */}
          {activeTab === "dashboard" && hospitalData && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {/* Analytics Cards */}
              {analyticsCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-md shadow-md flex items-center justify-between "
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-cyan-600">
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
            <CreateDoctorForm
              doctorForm={hospitalFunction.doctorForm}
              handleDoctorFormChange={hospitalFunction.handleDoctorFormChange}
              handleCreateDoctor={hospitalFunction.handleCreateDoctor}
            />
          )}

          {/* Update Beds Counter */}
          {activeTab === "updateBeds" && (
            <UpdateBedsCounter
              bedsCounter={hospitalFunction.bedsCounter}
              handleBedsCounterIncrement={
                hospitalFunction.handleBedsCounterIncrement
              }
              handleBedsCounterDecrement={
                hospitalFunction.handleBedsCounterDecrement
              }
            />
          )}

          {/* {activeTab === "approveAdmission" && (
            <ApproveAdmission
              admissionsToApprove={hospitalFunction.admissionsToApprove}
              handleApproveAdmission={hospitalFunction.handleApproveAdmission}
              handleRejectAdmission={hospitalFunction.handleRejectAdmission}
            />
          )} */}

          {/* View  Doctor list Section */}
          {activeTab === "doctorList" && (
            <DoctorList
              doctorList={hospitalFunction.doctorList}
              selectedDoctor={hospitalFunction.selectedDoctor}
              handleDoctorSelection={hospitalFunction.handleDoctorSelection}
              handleDeleteDoctor={hospitalFunction.handleDeleteDoctor}
            />
          )}
          {activeTab === "patientList" && (
            <PatientList
              handlePatientSelection={handlePatientSelection}
              handleDeletePatient={handleDeletePatient}
            />
          )}
          {activeTab === "pendingPatients" && (
            <PendingRegistration
              // handlePatientSelection={handlePatientSelection}
              // handleDeletePatient={handleDeletePatient}
            />
          )}
        </div>

        {/* View Patient List section */}
      </div>
    </div>
  );
};

export default HospitalDashboard;
