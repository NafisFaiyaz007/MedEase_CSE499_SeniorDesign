// BrowseDoctors.js
import React, { useState, useEffect } from "react";

const BrowseDoctors = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);

  useEffect(() => {
    // Fetch data from the doctor database here
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/doctors");
        const data = await response.json();
        
        // Update the state with the fetched doctors
        setAvailableDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    // Call the fetchDoctors function when the component mounts
    fetchDoctors();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const handleSetAppointment = async (doctor) => {
    // Implement logic to set an appointment
    try {
      const response = await fetch("http://localhost:8000/api/users/patient/registerUnderDoctor", {
        method: "POST", // or "POST" based on your backend logic
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({doctor_id: doctor.doctor_id}),
        credentials: "include",
      });
      const data = await response.json();

      // Update the state with the fetched doctors
      // setDoctorsList(data);
      console.log(data)
    } catch (error) {
      console.error("Error setting Appointment:", error);
    }
  
    console.log("Setting appointment with", doctor.name);
    
    // You may want to navigate to a new page or update the state accordingly
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {availableDoctors.map((doctor, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {doctor.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {doctor.designation} - {doctor.hospital}
            </p>
            <p className="text-gray-800">{doctor.description}</p>
          </div>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition duration-300 self-end"
            onClick={() => handleSetAppointment(doctor)}
          >
            Set Appointment
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrowseDoctors;
