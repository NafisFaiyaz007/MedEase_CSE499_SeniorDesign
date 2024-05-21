"use client";
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../app/components/navbar";
import ViewProfile from "./viewProfile";
import UploadDocuments from "./uploadDocument";
import PatientDashboardHeader from "./patientDashboardHeader"
import BrowseDoctors from "./browseDoctor";
import TakeAdmission from "./takeAdmission";
import EditAccountForm from "./editAccount";
import ViewAppointments from "./viewAppointments";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [uploadedFiles, setUploadedFiles] = useState([]);


  const patientName = "John Doe"; // Replace with the actual patient's name

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
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
            <UploadDocuments/>
          )}

          {/* Add content for other tabs */}

          {activeTab === "browseDoctors" && (
            <div className="space-y-6">
              <BrowseDoctors/>
            </div>
          )}
          {activeTab === "takeAdmission" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4 text-center">
               Browse Hospitals
              </h2>
              <TakeAdmission/>
            </div>
          )}
          {activeTab === "editAccount" && (

            <EditAccountForm/>
            
          )}
          {activeTab === "viewAppointments" && (

            <ViewAppointments />

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
