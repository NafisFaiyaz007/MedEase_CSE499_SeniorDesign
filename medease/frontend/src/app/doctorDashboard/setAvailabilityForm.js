import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SetAvailabilityForm = ({
  selectedDate,
  selectedTime,
  handleDateChange, // Do not redeclare these functions here
  handleTimeChange,
  handleSetAvailabilityDoctor,
}) => {
  const [doctorId, setDoctorId] = useState(""); // Assuming you have a way to get the doctorId
  const [availabilityDateTime, setAvailabilityDateTime] = useState(null);

  const handleSetAvailability = () => {
    if (!doctorId || !availabilityDateTime) {
      console.log("Please select both doctor and availability date/time");
      return;
    }

    fetch("http://localhost:8000/api/setAvailability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctorId, availabilityDateTime }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Handle response data as needed
      })
      .catch((error) => {
        console.error("Error setting availability:", error);
      });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        Set Availability
      </h2>
      {/* Date Picker */}
      <div className="m-4">
        <label htmlFor="datePicker" className="text-white m-3">
          Select Date:
        </label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={handleDateChange} // Use the passed prop function
          dateFormat="dd/MM/yyyy"
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
      </div>

      {/* Time Picker */}
      <div className="m-4">
        <label htmlFor="timePicker" className="text-white m-3">
          Select Time:
        </label>
        <input
          type="time"
          id="timePicker"
          value={selectedTime}
          onChange={(e) => handleTimeChange(e.target.value)} // Use the passed prop function
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
      </div>

      {/* Set Availability Button */}
      <button
        onClick={handleSetAvailability} // Use the local function
        className="bg-blue-500 text-white m-6 px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
      >
        Set Availability
      </button>
    </div>
  );
};

export default SetAvailabilityForm;
