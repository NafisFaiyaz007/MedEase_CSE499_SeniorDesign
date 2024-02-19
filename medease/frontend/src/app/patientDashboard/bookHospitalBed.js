// BookHospitalBed.js
import React from "react";

const BookHospitalBed = () => {
  // Your BookHospitalBed component code here
  // Dummy data for hospital beds, replace with actual data
  const hospitalBeds = [
    {
      name: "Hospital A",
      availableBeds: 20,
      description: "A description of Hospital A.",
    },
    {
      name: "Hospital B",
      availableBeds: 15,
      description: "A description of Hospital B.",
    },
    // Add more hospitals as needed
  ];
  const handleBookHospitalBed = () => {
    // Implement logic to book a hospital bed
    console.log("Booking a hospital bed");
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
              Available Beds: {hospital.availableBeds}
            </p>
            <p className="text-gray-800">{hospital.description}</p>
          </div>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition duration-300 self-end"
            onClick={() => handleBookBed(hospital)}
          >
            Book Bed
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookHospitalBed;
