import React, { useState } from "react";

const DoctorPatientList = ({ patientList, onDelete, onExamine }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const openReportsModal = (patient) => {
    setSelectedPatient(patient);
  };

  const closeReportsModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        Check Patient List
      </h2>
      <ul className="space-y-2">
        {patientList.map((patient, index) => (
          <li
            key={index}
            className="bg-gray-700 p-4 rounded-md shadow-md flex justify-between items-center"
          >
            <div>
              <strong>Name:</strong> {patient.name}, <strong>Age:</strong>{" "}
              {patient.age}, <strong>Gender:</strong> {patient.gender}
            </div>
            <div className="space-x-4">
              <button
                onClick={() => onDelete(patient.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => onExamine(patient.id)}
                className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-900 transition duration-300"
              >
                Examined
              </button>

              <button
                onClick={() => openReportsModal(patient)}
                className="bg-pink-700 text-white px-3 py-1 rounded-md hover:bg-pink-900 transition duration-300"
              >
                View Reports
              </button>

              <button
                onClick={() => onExamine(patient.id)}
                className="bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-900 transition duration-300"
              >
                Set Physical Appointment
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Reports Modal */}
      {selectedPatient && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
          <div className="bg-white p-4 rounded-md z-10">
            <h2 className="text-xl font-semibold mb-2">
              {selectedPatient.name}'s Reports
            </h2>
            {/* Display patient reports here */}
            {/* You can fetch and display the reports dynamically based on the selectedPatient data */}
            <p>This is where the reports will be displayed.</p>
            <button
              onClick={closeReportsModal}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatientList;
