import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../components/modal";
import {getDay, getDate, getTime } from "./doctorFunctions";

const SetAvailabilityForm = ({
  // selectedDate,
  // selectedTime,
  // handleDateChange, // Do not redeclare these functions here
  // handleTimeChange,
  // handleSetAvailabilityDoctor,
}) => {
  // const [doctorId, setDoctorId] = useState(""); // Assuming you have a way to get the doctorId
  const [availabilityDateTime, setAvailabilityDateTime] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState("")//new Date());
  const [selectedTime, setSelectedTime] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [scheduleData, setScheduleData] = useState('');


  useEffect(() => {
  getAvailableSlots()
  },[])
  async function getAvailableSlots(){
    try {
      const response = await fetch("http://localhost:8000/api/users/doctor/getAppointmentSlots", { method: "POST", credentials: "include" });
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setScheduleData(data)
      }
      // Update the state with the fetched doctors
      // setAvailableDoctors(data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  }

  const handleSetAvailability = () => {
    if (!selectedDate || !selectedTime) {
      setModalContent("Please select both availability date and time"); // Assuming the server sends back a "message" field
      setModalIsOpen(true); // Open the modal on successful fetch
      return;
    }

  fetch("http://localhost:8000/api/users/doctor/setAvailability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ 
        time: selectedDate + " " + selectedTime }),
    }).then(response => {
      if (!response.ok) { // Check if response is not ok (e.g., 400 or 500 status)
        return response.json().then(data => {throw new Error(data.error)});
      }
      return response.json();
    })
    .then(data => {
      setModalContent(data.message); // Assuming the server sends back a "message" field
      setModalIsOpen(true); // Open the modal on successful fetch
      getAvailableSlots();
    })
    .catch(error => {
      console.error("Error setting availabilitysdas:", error);
      setModalContent(error.message); // Set error message in modal
      setModalIsOpen(true); // Open the modal on error
    });
  };
async function removeSlot(slot){
fetch("http://localhost:8000/api/users/doctor/removeAppointmentSlot", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ 
        id: slot.id }),
    }).then(response => {
      if (!response.ok) { // Check if response is not ok (e.g., 400 or 500 status)
        return response.json().then(data => {throw new Error(data.error)});
      }
      return response.json();
    })
    .then(data => {
      setModalContent(data.message); // Assuming the server sends back a "message" field
      setModalIsOpen(true); // Open the modal on successful fetch
      getAvailableSlots();
    })
    .catch(error => {
      console.error("Error setting availabilitysdas:", error);
      setModalContent(error.message); // Set error message in modal
      setModalIsOpen(true); // Open the modal on error
    });
}
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
        <input
          id="datePicker"
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)} // Use the passed prop function
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
          onChange={(e) => setSelectedTime(e.target.value+ ":00")} // Use the passed prop function
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
      {scheduleData.length > 0 && (<div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Patient Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Day
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Appointment Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                {/* Doctor */}
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Department
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduleData.map((scheduleItem) => (
              <tr key={scheduleItem.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                  {scheduleItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {getDay(scheduleItem.start_time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {getDate(scheduleItem.start_time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {getTime(scheduleItem.start_time)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {/* {scheduleItem.doctor} */}
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
                    onClick={() => removeSlot(scheduleItem)}>Remove Slot</button>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.department}
                </td>  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default SetAvailabilityForm;
