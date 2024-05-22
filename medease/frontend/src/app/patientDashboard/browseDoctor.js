// BrowseDoctors.js
import React, { useState, useEffect, useRef } from "react";
import { getDay, getDate, getTime } from "../doctorDashboard/doctorFunctions";
import Modal from "../components/modal";

const BrowseDoctors = () => {
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [scheduleData, setScheduleData] = useState('');
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef();



  // Filtered lists based on search term
  const filteredDoctors = availableDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.hospitalAddress.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Fetch data from the doctor database here
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/doctors", { credentials: "include" });
        const data = await response.json();
        console.log(data)
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
        body: JSON.stringify({ doctor_id: doctor.doctor_id }),
        credentials: "include",
      }).then(response => {
        if (!response.ok) { // Check if response is not ok (e.g., 400 or 500 status)
          return response.json().then(data => { throw new Error(data.error + doctor.name) });
        }
        return response.json();
      })
        .then(data => {
          setModalContent(data.message); // Assuming the server sends back a "message" field
          setModalIsOpen(true); // Open the modal on successful fetch
        })
        .catch(error => {
          console.error("Error setting availability:", error);
          setModalContent(error.message); // Set error message in modal
          setModalIsOpen(true); // Open the modal on error
        });
    }
    catch (error) {
      console.error("Error setting availability:", error);
      setModalContent("Could not connect to the server"); // Set error message in modal
      setModalIsOpen(true); // Open the modal on error
    }
  };

  async function getAvailableSlots(doctor) {
    try {
      const response = await fetch(`http://localhost:8000/api/users/patient/doctorSchedule/${doctor.doctor_id}`, { method: "GET", headers: { "Content-Type": "application/json", }, credentials: "include", });
      const data = await response.json();
      if (response.ok) {
        // console.log(data)
        setScheduleData(data)
        setShowModal(true)
      }
      // Update the state with the fetched doctors
      // setAvailableDoctors(data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  }

  async function bookSlot(slot){
    fetch("http://localhost:8000/api/users/patient/bookSlot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ 
            slot: slot }),
        }).then(response => {
          if (!response.ok) { // Check if response is not ok (e.g., 400 or 500 status)
            return response.json().then(data => {throw new Error(data.error)});
          }
          return response.json();
        })
        .then(data => {
          setModalContent(data.message); // Assuming the server sends back a "message" field
          setModalIsOpen(true); // Open the modal on successful fetch
          getAvailableSlots(slot);
        })
        .catch(error => {
          console.error("Error setting availabilitysdas:", error);
          setModalContent(error.message); // Set error message in modal
          setModalIsOpen(true); // Open the modal on error
        });
    }
  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder={`Search doctor`}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar p-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2"><b>Specialization: </b>{doctor.specialization}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {doctor.designation} - {doctor.hospitalName}
                </p>
                <p className="text-gray-800">{doctor.hospitalAddress}</p>
              </div>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 transition duration-300 self-end"
                onClick={() => {
                  getAvailableSlots(doctor);
                }}
              >
                View Available Time
              </button>
            </div>
          ))}
        </div>
        {/* </div> */}
        {scheduleData.length > 0 && (<div>
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setScheduleData('')}></div>
          <div className={`fixed z-10 inset-0 overflow-y-auto `}>
            {/* Background overlay */}

            <div className="flex items-center justify-center min-h-screen ">
              <div className="bg-white rounded-lg shadow-xl max-w-fit w-full mx-4 overflow-y-auto">
                <div className="p-8 pb-4">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">Schedule</h2>
                  {/* Table */}
                  <table className="w-full border border-gray-200">
                    {/* Table header */}
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b">Patient Name</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b">Day</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b">Appointment Time</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"></th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scheduleData.map((scheduleItem) => (
                        <tr key={scheduleItem.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">{scheduleItem.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">{getDay(scheduleItem.start_time)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">{getDate(scheduleItem.start_time)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">{getTime(scheduleItem.start_time)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                            <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300" onClick={() => bookSlot(scheduleItem)}>Set Appointment</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-end mt-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300" onClick={() => setScheduleData('')}>Close</button>
                  </div>               
                 </div>
              </div>
            </div>
          <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          {modalContent}
        </Modal>
          </div>
        </div>
        )}
{/* 
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          {modalContent}
        </Modal> */}
      </div>
    </div>
  );
};

export default BrowseDoctors;
