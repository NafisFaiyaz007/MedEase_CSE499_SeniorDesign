// PatientList.js
import React, { useState, useEffect, useRef } from "react";
import * as hospitalFunction from "./hospitalFunctions";
import { handleGetReports, formatDate } from "../doctorDashboard/doctorFunctions";
import PdfComp from "../doctorDashboard/pdfcomp";
import { pdfjs } from "react-pdf";
import TransferPatientModal from "./transferPatientModal";
import UploadModal from "./uploadModal";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


const PatientList = ({ handlePatientSelection, handleDeletePatient }) => {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const modalRef = useRef();
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [transferModal, setTransferModal] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

   useEffect(() => {
     // Fetch doctor list when the component mounts
     const fetchData = async () => {
       const patients = await hospitalFunction.fetchPatientList();
       setPatientList(patients);
     };

     fetchData();
   }, []);

   const toggleUploadModal = () => {
    setUploadModalOpen(!uploadModalOpen);
};
   const openUploadModal = (patient) =>{
    setUploadModalOpen(true);
    setSelectedPatient(patient)
   };
   const openReportsModal = (patient) => {
    setIsReportsModalOpen(true)
    setSelectedPatient(patient);
    handleGetReports(patient, updateReports);
  };

  const closeReportsModal = () => {
    setIsReportsModalOpen(false);
    setSelectedPatient(null);
  };
  const [showModal, setShowModal] = useState(false);


  const handleCloseFileModal = () => {
    setSelectedPdfFile(null);
    setIsFileModalOpen(false);
  };

  const handleCloseTransferModal = () => {
    setTransferModal(false);
  };

  const updateReports = (data) => {
    setReports(data)
  }
  const showPdf = async (file) => {
    // const pdf = await handleViewReport(fileID);
    // setCurrentFileID(`http://localhost:6000/files/${pdf}`);
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
      {/* List of Patients */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {patientList.map((patient) => (
          <div
            key={patient.id}
            className={`bg-white p-6 rounded-md shadow-md `}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Name: {patient.name}
            </h3>
            <h6 className="text-lg font-thin text-gray-600 mb-2">
              Age: {calculateAge(patient.dateOfBirth)}
            </h6>
            <h6 className="text-lg font-thin text-gray-600 mb-2">
              <b>Phone: </b> {patient.phone_number}
            </h6>
            <h6 className="text-lg font-thin text-gray-600 mb-2">
              <b>Email: </b> {patient.email}
            </h6>
            <h6 className="text-lg font-thin text-gray-600 mb-2">
              <b>Gender: </b> {patient.gender}
            </h6>
            <h6 className="text-lg font-thin text-gray-600 mb-2">
              <b>Address: </b> {patient.address}
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
              {/* <button
                onClick={() => {
                  handlePatientSelection(patient);
                  // setSelectedPatient(patient);
                }}
                className="bg-cyan-600 font-semibold text-white px-2 py-2 rounded-md focus:outline-none hover:bg-cyan-900 transition duration-300 w-full"
              >
                Delete Patient
              </button> */}
              <button
                onClick={() => {
                  setTransferModal(true);
                  setSelectedPatient(patient);
                  // hospitalFunction.handleTransferPatient
                }}
                className="bg-cyan-600 font-semibold text-white px-2 py-2 rounded-md focus:outline-none hover:bg-cyan-900 transition duration-300 w-full"
              >
                Transfer Patient
              </button>
              <button
                onClick={() => openUploadModal(patient)}
                className="bg-cyan-600 font-semibold text-white px-2 py-2 rounded-md focus:outline-none hover:bg-cyan-900 transition duration-300 w-full"
              >
                Upload File
              </button>
              <button
                onClick={() => openReportsModal(patient)}
                className="bg-cyan-600 font-semibold text-white px-2 py-2 rounded-md focus:outline-none hover:bg-cyan-900 transition duration-300 w-full"
              >
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Button */}
      {/* <button
          onClick={hospitalFunction.handleDeleteSelectedPatient}
          className="bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          Delete Selected Patient
        </button>
        <button
          onClick={hospitalFunction.handleTransferPatient}
          className="bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-700 transition duration-300"
        >
          Transfer Patient
        </button> */}
      {/* Reports Modal */}
      {isReportsModalOpen && (
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
                {reports.map((report) => (
                  <tr key={report.ID}>
                    <td>{report.fileName}</td>
                    <td>{formatDate(report.uploaded)}</td>
                    <td>
                      <button
                        onClick={() => showPdf(report)} //handleViewReport(report.ID)}
                        className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-cyan-700 transition duration-300"
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
              className="bg-cyan-600 text-white px-3 py-1 rounded-md hover:bg-cyan-700 transition duration-300 mt-2"
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
            <div className="fixed inset-0 bg-gray-600 justify=center opacity-75"></div>
            <div className="z-20 bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-red-700 cursor-pointer"
                onClick={handleCloseFileModal}
              >
                &times; CLOSE
              </button>
              <div className="p-6">
                {selectedPdfFile && (
                  <PdfComp props={selectedPdfFile} fetchFromBlockchain={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {transferModal && (
        <TransferPatientModal
          handleClose={handleCloseTransferModal}
          patient={selectedPatient.id}
        />
      )}
      {uploadModalOpen && <UploadModal patient={selectedPatient} onClose={toggleUploadModal}/>}
    </div>
  );
};

export default PatientList;
