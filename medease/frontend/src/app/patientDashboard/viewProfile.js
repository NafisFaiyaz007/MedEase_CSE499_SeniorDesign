import React, { useState, useEffect } from "react";

const ViewProfile = () => {
  const [patientData, setPatientData] = useState(null);

useEffect(() => {
  const fetchPatientData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/patients", {
        method: "GET", // or "POST" based on your backend logic
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched patient data:", data); // Log the fetched data
        setPatientData(data[0]);
      } else {
        console.error("Failed to fetch patient data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  fetchPatientData();
}, []);

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  // If the birth month is greater than the current month or
  // if they are in the same month but the birth day is greater than the current day,
  // then decrement the age by 1
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
  }

  return age;
}

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">
        View Profile
      </h2>

      {patientData ? (
        <div>
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
                  <strong>Age:</strong> {calculateAge(patientData.dateOfBirth)}
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

          {patientData &&
            patientData.upcomingAppointments &&
            patientData.upcomingAppointments.length > 0 && (
              <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Upcoming Appointments:
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {patientData.upcomingAppointments.map(
                    (appointment, index) => (
                      <li key={index} className="mb-2">
                        <strong>Doctor:</strong> {appointment.doctor},{" "}
                        <strong>Date:</strong> {appointment.date},{" "}
                        <strong>Time:</strong> {appointment.time}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewProfile;
