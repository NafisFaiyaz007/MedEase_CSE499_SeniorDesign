import React from "react";

const patientDashboardHeader = ({ activeTab, setActiveTab }) => {
    
return (
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
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-6 py-3 rounded-md focus:outline-none hover:bg-purple-800 hover:text-white transition duration-300`}
      >
        View Profile
      </button>
      <button
        onClick={() => setActiveTab("uploadDocuments")}
        className={`${
          activeTab === "uploadDocuments"
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-6 py-3 rounded-md focus:outline-none hover:bg-purple-800 hover:text-white transition duration-300`}
      >
        Upload/View Documents
      </button>
      <button
        onClick={() => setActiveTab("browseDoctors")}
        className={`${
          activeTab === "browseDoctors"
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-6 py-3 rounded-md focus:outline-none hover:bg-purple-800 hover:text-white transition duration-300`}
      >
        Browse Doctors
      </button>

      <button
        onClick={() => setActiveTab("takeAdmission")}
        className={`${
          activeTab === "takeAdmission"
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-6 py-3 rounded-md focus:outline-none hover:bg-purple-800 hover:text-white transition duration-300`}
      >
        Take Admission
      </button>

      <button
        onClick={() => setActiveTab("editAccount")}
        className={`${
          activeTab === "editAccount"
            ? "bg-purple-500 text-white"
            : "bg-gray-200 text-gray-600"
        } px-6 py-3 rounded-md focus:outline-none hover:bg-purple-800 hover:text-white transition duration-300`}
      >
        Edit Account
      </button>

      {/* Add more tabs for other use cases */}
    </div>
  </div>
);
};
export default patientDashboardHeader