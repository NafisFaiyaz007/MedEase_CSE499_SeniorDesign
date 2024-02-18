// SetAvailabilityForm.js
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as DoctorFunctions from "./doctorFunctions";


const SetAvailabilityForm = ({ selectedDate, selectedTime, handleDateChange, handleTimeChange, handleSetAvailabilityDoctor }) => {
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
          onChange={DoctorFunctions.handleDateChange}
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
          onChange={(e) => DoctorFunctions.handleTimeChange(e.target.value)}
          className="px-3 py-2 text-black rounded-md focus:outline-2 focus:outline-blue-500"
        />
      </div>

      {/* Set Availability Button */}
      <button
        onClick={DoctorFunctions.handleSetAvailabilityDoctor}
        className="bg-blue-500 text-white m-6 px-4 py-2 rounded-md focus:outline-none hover:bg-blue-800 transition duration-300"
      >
        Set Availability
      </button>
    </div>
  );
};

export default SetAvailabilityForm;
