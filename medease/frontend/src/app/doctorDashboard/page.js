// pages/doctor/dashboard.js

"use client"
import React, { useState } from "react";
import Head from "next/head";
import Navbar from "../../app/components/navbar";
import * as DoctorFunctions from "./doctorFunctions";
import DoctorPatientList from "./doctorPatientList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("editAccount");

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

const [selectedDate, setSelectedDate] = useState(null);
const [selectedTime, setSelectedTime] = useState(null);
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
                {/* Doctor Information Fields */}
                <label htmlFor="doctorName" className="text-white">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={doctorInfo.doctorName}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                <label htmlFor="degree" className="text-white">
                  Degree
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={doctorInfo.degree}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                <label htmlFor="specialization" className="text-white">
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={doctorInfo.specialization}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                <label htmlFor="phoneNumber" className="text-white">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={doctorInfo.phoneNumber}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                <label htmlFor="hospital" className="text-white">
                  Hospital
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={doctorInfo.hospital}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                <label htmlFor="designation" className="text-white">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={doctorInfo.designation}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                <label htmlFor="age" className="text-white">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={doctorInfo.age}
                  onChange={DoctorFunctions.handleEditAccountChange}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />

                {/* Add more fields as needed */}

                {/* Save Changes Button */}
                <button
                  onClick={DoctorFunctions.handleEditAccount}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
                >
                  Save Changes
                </button>

                {/* Delete Account Button */}
                <button
                  onClick={DoctorFunctions.handleDeleteAccount}
                  className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-800 transition duration-300 mt-4"
                >
                  Delete Account
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
              {/* Date Picker */}
              <div className="m-4">
                <label htmlFor="datePicker" className="text-white m-3">
                  Select Date:
                </label>
                <DatePicker
                  id="datePicker"
                  selected={selectedDate}
                  onChange={DoctorFunctions.handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
              </div>

              {/* Time Picker */}
              <div className="m-4">
                <label htmlFor="timePicker" className="text-white m-3">
                  Select Time:
                </label>
                <input
                  type="time"
                  id="timePicker"
                  value={selectedTime}
                  onChange={(e) => DoctorFunctions.handleTimeChange(e.target.value)}
                  className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
                />
              </div>

              {/* Set Availability Button */}
              <button
                onClick={DoctorFunctions.handleSetAvailabilityDoctor}
                className="bg-blue-500 text-white m-6 px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
              >
                Set Availability
              </button>
            </div>
          )}

          {/* Check Patient List */}
          {activeTab === "checkPatientList" && (
            <DoctorPatientList
              patientList={[
                { id: 1, name: "Patient 1", age: 30, gender: "Male" },
                { id: 2, name: "Patient 2", age: 25, gender: "Female" },
                // Add more patient data as needed
              ]}
              onDelete={DoctorFunctions.handleDeletePatient}
              onExamine={DoctorFunctions.handleExaminePatient}
            />
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

         
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
