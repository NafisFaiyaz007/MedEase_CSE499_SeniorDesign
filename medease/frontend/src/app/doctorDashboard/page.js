// pages/doctor/dashboard.js

"use client"
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../app/components/navbar";
import * as DoctorFunctions from "./doctorFunctions";
import DoctorPatientList from "./doctorPatientList";
import "react-datepicker/dist/react-datepicker.css";
import EditAccountForm from "./editAccountForm";
import SetAvailabilityForm from "./setAvailabilityForm";
import ViewSchedule from "./viewSchedule";
import DoctorDashboardHeader from "./doctorButtons";


const DoctorDashboard = () => {
 const [activeTab, setActiveTab] = useState("editAccount");
//  const [selectedDate, setSelectedDate] = React.useState(new Date());
//  const [selectedTime, setSelectedTime] = React.useState("");

 // Functions for handling date and time changes
 const handleDateChange = (date) => {
   setSelectedDate(date);
   console.log(selectedDate)
 };

 const handleTimeChange = (time) => {
   setSelectedTime(time);
   console.log(selectedTime)
 };

 // Function for handling setting availability
 const handleSetAvailabilityDoctor = () => {
   // Implement your logic for setting availability here
   console.log("Setting availability:", selectedDate, selectedTime);
 };

  const [doctorInfo, setDoctorInfo] = useState({
    doctorName: "Dr. John Doe",
    degree: "MD",
    specialization: "Cardiology",
    phoneNumber: "123-456-7890",
    hospital: "City Hospital",
    designation: "Senior Cardiologist",
    age: 35,
  }); // Replace with the actual doctor's name

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
      <Navbar adminName={doctorInfo.doctorName} handleLogout={handleLogout} />

      {/* Content */}
      <div className="container mx-auto p-4 flex items-center justify-center">
        {/* Left half */}
        <DoctorDashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Right half */}
        <div className="flex-1">
          {/* Content based on active tab */}
          {activeTab === "editAccount" && (
            <EditAccountForm
              doctorInfo={doctorInfo}
              handleEditAccount={DoctorFunctions.handleEditAccount}
              handleDeleteAccount={DoctorFunctions.handleDeleteAccount}
              handleEditAccountChange={DoctorFunctions.handleEditAccountChange}
            />
          )}

          {/* Set Availability */}
          {activeTab === "setAvailability" && (
            <SetAvailabilityForm
              // selectedDate={selectedDate}
              // selectedTime={selectedTime}
              // handleDateChange={handleDateChange}
              // handleTimeChange={handleTimeChange}
              // handleSetAvailabilityDoctor={handleSetAvailabilityDoctor}
            />
          )}

          {/* Check Patient List */}
          {activeTab === "checkPatientList" && (
            <DoctorPatientList
              // patientList={[
              //   { id: 1, name: "Patient 1", age: 30, gender: "Male" },
              //   { id: 2, name: "Patient 2", age: 25, gender: "Female" },
              //   // Add more patient data as needed
              // ]}
              onDelete={DoctorFunctions.handleDeletePatient}
              onExamine={DoctorFunctions.handleExaminePatient}
            />
          )}
          {/* View Schedule */}
          {activeTab === "viewSchedule" && <ViewSchedule />}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
