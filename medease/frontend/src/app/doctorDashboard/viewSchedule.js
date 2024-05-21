import React, { useEffect, useState, useRef } from "react";
import PdfComp from "./pdfcomp";
import { pdfjs } from "react-pdf";
import { handleGetReports, formatDate, getDay, getDate, getTime } from "./doctorFunctions";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ViewSchedule = () => {
  // Sample patient schedule data
  const [scheduleData, setScheduleData] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const modalRef = useRef();
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  useEffect(() => {
    // Fetch data from the doctor database here
   

    // Call the fetchDoctors function when the component mounts
    getPatientList();
  }, [])

  const getPatientList = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users/doctor/viewSchedule", { method: "POST", credentials: "include" });
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
  const openReportsModal = (patient) => {
    setSelectedPatient(patient);
    handleGetReports(patient, updateReports);
  };

  const closeReportsModal = () => {
    setSelectedPatient(null);
  };
  const handleCloseFileModal = () => {
    setSelectedPdfFile(null);
    setIsFileModalOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const updateReports = (data) => {
    setReports(data)
  }
  const showPdf = async (file) => {
    // const pdf = await handleViewReport(fileID);
    // setCurrentFileID(`http://localhost:5000/files/${pdf}`);
    setSelectedPdfFile(file);
    setIsFileModalOpen(true);
  };

  const completeCheckup = async (appointment) => {
    const x =appointment.appointment_id;
    try {
      const response = await fetch(`http://localhost:8000/api/users/doctor/completeCheckup/${appointment.appointment_id}`, { method: "GET", credentials: "include", });
      const data = await response.json();
      if (response.ok) {
        console.log(data)
        getPatientList();
        // setScheduleData(data)
      }
      // Update the state with the fetched doctors
      // setAvailableDoctors(data);
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  }

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
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={() => openReportsModal(scheduleItem)}>View Reports</button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {/* {scheduleItem.doctor} */}
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={() => completeCheckup(scheduleItem)}>Complete</button>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b">
                  {scheduleItem.department}
                </td>  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
      {/* Reports Modal */}
      {selectedPatient && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
          <div className="bg-white p-4 rounded-md z-10">
            <h2 className="text-xl font-semibold mb-2">
              {selectedPatient.name}'s Reports
            </h2>
            {/* Display patient reports here */}
            {reports.length>0 && <table className="w-full">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Date Uploaded</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report.ID}>
                    <td>{report.fileName}</td>
                    <td>{formatDate(report.uploaded)}</td>
                    <td>
                      <button
                        onClick={() => showPdf(report)}//handleViewReport(report.ID)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
            <button
              onClick={closeReportsModal}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300 mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isFileModalOpen && (
        <div className="fixed z-100 inset-0 overflow-y-auto">
          <div
            className="flex items-center justify-center min-h-screen"
            ref={modalRef}
          >
            <div className="fixed inset-0 bg-gray-500 justify=center opacity-75"></div>
            <div className="z-20 bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-red-700 cursor-pointer"
                onClick={handleCloseFileModal}
              >
                &times; CLOSE
              </button>
              <div className="p-6">
                {selectedPdfFile && <PdfComp props={selectedPdfFile} fetchFromBlockchain={true}/>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewSchedule;
