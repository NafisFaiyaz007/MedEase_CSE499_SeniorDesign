// PatientList.js
import React, { useState, useEffect } from "react";
import * as hospitalFunction from "./hospitalFunctions";

const PatientList = ({ handlePatientSelection, handleDeletePatient }) => {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  //  useEffect(() => {
  //    // Fetch doctor list when the component mounts
  //    const fetchData = async () => {
  //      const patients = await hospitalFunction.fetchPatientList();
  //      setPatientList(patients);
  //    };

  //    fetchData();
  //  }, []);
const scheduleData = [
  {
    id: 1,
    patientName: "John Doe",
    age: 23,
    date: "April 25",
    appointmentTime: "10:00 AM",
    doctor: "Dr. Smith",
    department: "Cardiology",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    day: "Tuesday",
    date: "April 26",
    appointmentTime: "11:00 AM",
    doctor: "Dr. Johnson",
    department: "Dermatology",
  },
  {
    id: 3,
    patientName: "Michael Johnson",
    day: "Wednesday",
    date: "April 27",
    appointmentTime: "12:00 PM",
    doctor: "Dr. Brown",
    department: "Neurology",
  },
  {
    id: 4,
    patientName: "Emily Brown",
    day: "Thursday",
    date: "April 28",
    appointmentTime: "02:00 PM",
    doctor: "Dr. Anderson",
    department: "Ophthalmology",
  },
];

  return (
    <div className="space-y-4">
      {/* List of Patients */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {scheduleData.map((patient) => (
          <div
            key={patient.id}
            className={`bg-white p-6 rounded-md shadow-md `}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Name: {patient.patientName}
            </h3>
            {/* <h6 className="text-lg font-thin text-gray-500 mb-2">
              Age: {patient.age}
            </h6>
            <h6 className="text-lg font-thin text-gray-500 mb-2">
              ID: {patient.patient_id}
            </h6> */}
            {/* Delete Button */}
            <button
              onClick={() => {
                handlePatientSelection(patient);
                setSelectedPatient(patient);
              }}
              className="bg-red-700 font-semibold text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-900 transition duration-300"
            >
              Delete Patient
            </button>

            <button
              onClick={() => {
                // handlePatientSelection(patient);
                // setSelectedPatient(patient);
              }}
              className="bg-purple-700 font-semibold text-white mx-5 px-4 py-2 rounded-md focus:outline-none hover:bg-purple-900 transition duration-300"
            >
              View Report
            </button>
          </div>
        ))}
      </div>
      {/* Delete Button */}
      {selectedPatient && (
        <button
          onClick={hospitalFunction.handleDeleteSelectedPatient}
          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          Delete Selected Patient
        </button>
      )}
    </div>
  );
};

export default PatientList;
