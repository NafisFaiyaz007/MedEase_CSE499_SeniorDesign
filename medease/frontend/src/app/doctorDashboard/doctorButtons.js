// DoctorDashboardHeader.js
import React from "react";

const DoctorDashboardHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-col items-start mr-8">
          {/* Doctor Dashboard Text */}
          <h1 className="text-3xl font-semibold my-6 text-white">
            Doctor Dashboard
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
            {/* <button
              onClick={() => setActiveTab("editAccount")}
              className={`${
                activeTab === "editAccount"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600"
              } px-6 py-3 rounded-md focus:outline-none hover:bg-blue-800 hover:text-white transition duration-300`}
            >
              Edit Account
            </button> */}
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
  );
};

export default DoctorDashboardHeader;
