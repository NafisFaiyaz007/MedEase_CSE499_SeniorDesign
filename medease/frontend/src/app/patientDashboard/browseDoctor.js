// BrowseDoctors.js
import React,{useState} from "react";

const BrowseDoctors = () => {
  // Your BrowseDoctors component code here
    const handleBrowseDoctors = () => {
      // Implement logic to browse doctors
      console.log("Browsing doctors");
      // You may want to navigate to a new page or update the state accordingly
    };
    const [availableDoctors, setAvailableDoctors] = useState([
      {
        name: "Dr. Smith",
        designation: "Cardiologist",
        hospital: "City Hospital",
        description: "Specialized in heart-related issues.",
      },
      {
        name: "Dr. Johnson",
        designation: "Orthopedic Surgeon",
        hospital: "OrthoCare Center",
        description: "Expert in orthopedic surgeries and treatments.",
      },
      // Add more doctors as needed
    ]);
    const handleBookAppointment = () => {
      // Implement logic to book an appointment
      console.log("Booking an appointment");
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
