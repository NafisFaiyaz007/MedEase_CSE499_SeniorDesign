import React, { useEffect, useState } from "react";

const SendFileModal = ({ handleClose, currentFile }) => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the doctor database here
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/doctors", {
          method: "GET", // or "POST" based on your backend logic
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        // Update the state with the fetched doctors
        setDoctorsList(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Call the fetchDoctors function when the component mounts
    fetchDoctors();
  }, []);

  // Function to handle sending a file to a doctor
  const sendFileToDoctor = async (doctorId) => {
    // Implement sending file logic here
    console.log("Sending file to doctor with ID:", doctorId + " and file: " + currentFile);
    try {
      const response = await fetch("http://localhost:8000/api/users/patient/grant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({doctorUUID: doctorId, fileID: currentFile}),
        credentials: "include",
      });
      const data = await response.json();

      // Update the state with the fetched doctors
      // setDoctorsList(data);
      console.log(data);
    } catch (error) {
      console.error("Error granting permission to doctor:", error);
    }
  };
  // Function to handle revoking a file from a doctor
  const revokePermission = async (doctorId) => {
    // Implement sending file logic here
    console.log("Revoking file from doctor with ID:", doctorId + "and file: " + currentFile);
    try {
      const response = await fetch("http://localhost:8000/api/users/patient/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({doctorUUID: doctorId, fileID: currentFile}),
        credentials: "include",
      });
      const data = await response.json();

      // Update the state with the fetched doctors
      // setDoctorsList(data);
      console.log(data);
    } catch (error) {
      console.error("Error granting permission to doctor:", error);
    }
  };
return (
  <div className="modal fixed top-0 text-gray-800 left-0 w-full h-full flex items-center justify-center">
    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div className="modal-container bg-gray-200 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div className="modal-content py-4 text-left px-6">
        <div className="flex justify-between items-center pb-3">
          <p className="text-2xl font-bold">List of Doctors</p>
          <button
            className="modal-close cursor-pointer z-50"
            onClick={handleClose}
          >
            <svg
              className="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M18 1.425L16.575 0 9 7.575 1.425 0 0 1.425 7.575 9 0 16.575 1.425 18 9 10.425 16.575 18 18 16.575 10.425 9z" />
            </svg>
          </button>
        </div>
        <ul>
          {doctorsList.map((doctor) => (
            <li
              key={doctor.doctor_id}
              className="flex justify-between items-center mb-2 px-2 bg-white"
            >
              <span>{doctor.degree} {doctor.name}- {doctor.designation}</span>
              <button
                onClick={() => sendFileToDoctor(doctor.UUID)}
                className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded"
              >
                Send File
              </button>
              <button
                onClick={() => revokePermission(doctor.UUID)}
                className="bg-green-700 hover:bg-green-500 text-white font-bold py-1 px-2 rounded"
              >
                Revoke Access
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
};

export default SendFileModal;
