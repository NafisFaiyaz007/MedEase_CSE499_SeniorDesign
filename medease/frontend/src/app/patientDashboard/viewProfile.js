// ViewProfile.js
import React, {useState} from "react";

const ViewProfile = ({  }) => {
  // Your ViewProfile component code here
  const handleViewProfile = () => {
     // Implement logic to view patient's profile
    console.log("Viewing patient profile");
     // You may want to navigate to a new page or update the state accordingly
  };
  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 30,
    gender: "Male",
    email: "john.doe@example.com",
    upcomingAppointments: [
      {
        doctor: "Dr. Smith",
        date: "2023-12-20",
        time: "10:00 AM",
      },
      // Add more appointments as needed
    ],
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">
        View Profile
      </h2>
      {/* Implement your logic for displaying and editing patient profile */}
      {/* Personal Information Section */}
      {/* Personal Information Section */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700">
              <strong>Name:</strong> {patientData.name}
            </p>
            <p className="text-gray-700">
              <strong>Age:</strong> {patientData.age}
            </p>
            <p className="text-gray-700">
              <strong>Gender:</strong> {patientData.gender}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              <strong>Email:</strong> {patientData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments Section */}
      {patientData.upcomingAppointments.length > 0 && (
        <div className="bg-white p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Upcoming Appointments:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {patientData.upcomingAppointments.map((appointment, index) => (
              <li key={index} className="mb-2">
                <strong>Doctor:</strong> {appointment.doctor},{" "}
                <strong>Date:</strong> {appointment.date},{" "}
                <strong>Time:</strong> {appointment.time}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

};

export default ViewProfile;
