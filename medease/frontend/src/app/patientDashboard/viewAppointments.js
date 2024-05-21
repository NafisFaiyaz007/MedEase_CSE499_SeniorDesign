import React, { useEffect, useState, useRef } from "react";
import { formatDate, getDay, getDate, getTime } from "../doctorDashboard/doctorFunctions";


const ViewAppointments = () => {
  // Sample patient schedule data
  const [scheduleData, setScheduleData] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const modalRef = useRef();
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  useEffect(() => {
    // Fetch data from the doctor database here
    const getPatientAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/patient/getPatientAppointments", { method: "GET", credentials: "include" });
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
    };

    // Call the fetchDoctors function when the component mounts
    getPatientAppointments();
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">View Schedule</h2>
      {scheduleData.length > 0 && (<div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Doctor Name
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
                Hospital
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-red-600 uppercase tracking-wider border-b"
              >
                Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduleData.map((scheduleItem) => (
              <tr key={scheduleItem.appointment_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                  {scheduleItem.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {getDay(scheduleItem.appointment_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {getDate(scheduleItem.appointment_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {getTime(scheduleItem.appointment_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {/* {scheduleItem.doctor} */}
                  {scheduleItem.hospitalName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.address}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.department}
                </td>  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}

    </div>
  );
};
export default ViewAppointments;
