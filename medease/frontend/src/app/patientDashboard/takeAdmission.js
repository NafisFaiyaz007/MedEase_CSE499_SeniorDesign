// BookHospitalBed.js
import React, { useState, useEffect } from "react";

const TakeAdmission = () => {
  const [hospitalBeds, setHospitalBeds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/hospitals", {credentials: "include"})
      .then((response) => response.json())
      .then((data) => setHospitalBeds(data))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  const takeAdmission = (hospital) => {
    // Implement logic to book a hospital bed
    console.log("Booking a hospital bed", hospital);
    // You may want to navigate to a new page or update the state accordingly
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {hospitalBeds.map((hospital, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {hospital.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Available Beds: {hospital.beds}
            </p>
            
          </div>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition duration-300 self-end"
            onClick={() => takeAdmission(hospital)}
          >
           Take Admission
          </button>
        </div>
      ))}
    </div>
  );
};

export default TakeAdmission;
