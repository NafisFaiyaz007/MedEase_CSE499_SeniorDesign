import React, { useState, useEffect, useRef } from "react";
import PrescriptionModal from "./prescription";
import { handleGetReports, formatDate } from "./doctorFunctions";
import PdfComp from "./pdfcomp";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const DoctorPatientList = ({ onDelete, onExamine }) => {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const modalRef = useRef();
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);


  useEffect(() => {
    // Fetch data from the doctor database here
    const getPatientList = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users/doctor/getPatientList",{ method: "POST", credentials:"include"});
        const data = await response.json();
        if(response.ok){
        console.log(data)
        setPatientList(data)
        }
        // Update the state with the fetched doctors
        // setAvailableDoctors(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    // Call the fetchDoctors function when the component mounts
    getPatientList();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  const openReportsModal = (patient) => {
    setSelectedPatient(patient);
    handleGetReports(patient, updateReports);
  };

  const closeReportsModal = () => {
    setSelectedPatient(null);
  };
  const [showModal, setShowModal] = useState(false);

  const handleWritePrescription = () => {
    setShowModal(true);
  };

  const handleCloseFileModal = () => {
    setSelectedPdfFile(null);
    setIsFileModalOpen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePrescriptionSubmit = (prescriptionDetails) => {
    // Handle the prescription submission logic here
    console.log("Prescription submitted:", prescriptionDetails);
    // Close the modal after submission
    handleCloseModal();
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">
        Check Patient List
      </h2>
      <ul className="space-y-2">
        {patientList.map((patient, index) => (
          <li
            key={index}
            className="bg-gray-200 p-4 rounded-md shadow-md flex justify-between items-center"
          >
            <div>
              <strong>Name:</strong> {patient.name}, <strong>Age:</strong>{" "}
              {calculateAge(patient.dateOfBirth)}, <strong>Gender:</strong> {patient.gender}
            </div>
            <div className="space-x-4">
             
              <button
                onClick={() => onExamine(patient.id)}
                className="bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-900 transition duration-300"
              >
                Examined
              </button>

              <button
                onClick={() => openReportsModal(patient)}
                className="bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-900 transition duration-300"
              >
                View Reports
              </button>

              
              <button
                onClick={handleWritePrescription}
                className="bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-900 transition duration-300"
              >
                Write Prescription
              </button>

              {showModal && (
                <PrescriptionModal
                  patientDetails={patient}
                  onClose={handleCloseModal}
                  onPrescriptionSubmit={handlePrescriptionSubmit}
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Reports Modal */}
      {selectedPatient && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
          <div className="bg-white p-4 rounded-md z-10">
            <h2 className="text-xl font-semibold mb-2">
              {selectedPatient.name}'s Reports
            </h2>
            {/* Display patient reports here */}
            {/* You can fetch and display the reports dynamically based on the selectedPatient data */}
            <p>This is where the reports will be displayed.</p>
            {/* Display patient reports here */}
      <table className="w-full">
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
      </table>
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
                {selectedPdfFile && <PdfComp props={selectedPdfFile} fetchFromBlockchain={true} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default DoctorPatientList;
