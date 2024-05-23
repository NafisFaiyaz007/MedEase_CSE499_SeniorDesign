import React, { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "../doctorDashboard/pdfcomp";
import axios from "axios";
import Modal from "../components/modal";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const UploadModal = ({ patient, onClose }) => {
    const [fileToUpload, setFileToUpload] = useState([]);
    const [selectedPdfFile, setSelectedPdfFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSendFileModalOpen, setIsSendFileModalOpen] = useState(false);
    const modalRef = useRef();


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');


    const handleChooseFile = async (file) => {
        // setUploadedFiles((prevFiles) => [...prevFiles, file]);
        setFileToUpload((prevFiles) => [...prevFiles, file]);
    };

    const handleUploadFile = async (file) => {
        try {
            // Create a FormData object
            const formData = new FormData();
            // Append the file and other data to the FormData object
            formData.append("file", file);
            formData.append("fileName", file.name); // Name of the file
            formData.append("patientUUID", patient.UUID); // Patient's UUID

            // Assuming 'accessList' is supposed to be sent as an array,
            // and needs to be stringified if it involves complex objects or arrays
            formData.append("accessList", JSON.stringify([])); // Send it as a JSON string if needed

            // Make the axios POST request
            const response = await axios.post(
                "http://localhost:8000/api/users/doctor/uploadFile",
                formData, // Correctly pass the formData object
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // This header might be automatically set by browsers
                    },
                    withCredentials: true
                }
            );

            // Handle response here
            // console.log('File uploaded successfully:', response.data);
            setModalContent(response.data)
            setModalIsOpen(true)
        } catch (error) {
            // Handle error here
            console.error('Error uploading file:', error);
            setModalContent("Failed to upload file");
            setModalIsOpen(true)
        }

        // try {
        //     // Create a FormData object
        //     const formData = new FormData();
        //     // Append the file to the FormData object
        //     formData.append("file", file);
        //     formData.append("fileName", file.name)
        //     formData.append("accessList", []);
        //     formData.append("patientUUID", patient.UUID)
        //     // const body = {
        //     //     fileName: file.name,//'patient1_8918a7b97ed45aed0c760ba5d4bbc304fdebe4194eedf22e23c72a105873693b'
        //     //     patientUUID: patient.UUID,
        //     // };
        //     const response = await axios.post(
        //         "http://localhost:8000/api/users/doctor/uploadFile",
        //         ...formData,
        //         {
        //             //responseType: 'blob',
        //             headers: {
        //                 "Content-Type": "multipart/form-data", // Set the correct Content-Type header
        //             },
        //             withCredentials: true
        //         }
        //     );

        //     // const data = await response.data;
        //     console.log(response.data.message)
        //     const data = response.data.message;
        //     console.log(data)
        //     setFileToUpload([])
        //     //   setModalContent(data);
        //     //   setIsModalOpen(true);

        // } catch (error) {
        //     console.error('Error fetching file:', error);
        // }
    };

    const handleCloseModal = () => {
        setSelectedPdfFile(null);
        setIsModalOpen(false);
    };


    const handleRemoveFile = async (index) => {
        const updatedFiles = [...fileToUpload];
        updatedFiles.splice(index, 1);
        setFileToUpload(updatedFiles);
    };

    const handleSendFile = async (file) => {
        setSelectedPdfFile(file);
        setIsSendFileModalOpen(true);
    };

    const showPdf = (pdf) => {
        // setCurrentFileID(`http://localhost:5000/files/${pdf}`);
        console.log(pdf);
        setSelectedPdfFile(pdf);
        setIsModalOpen(true);
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-sky-600 p-6 rounded-lg shadow-lg max-w-lg">
                <div className="space-y-6">
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-300"
                        onClick={onClose}>Close</button>
                    <h2 className="text-xl font-semibold text-white mb-4 text-center">
                        Upload/View Documents
                    </h2>
                    <div className="mb-4">
                        <label htmlFor="fileInput" className="block text-white mb-2">
                            Choose File:
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={(e) => handleChooseFile(e.target.files[0])}
                            className="border p-2"
                        />
                    </div>

                    {/* Div to view file to be uploaded */}
                    {
                        fileToUpload.length > 0 && (
                            <div className="bg-white p-4 rounded-md shadow-md" id="root">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Upload File:
                                </h3>
                                <ul className="list-disc list-inside text-gray-700">

                                    {fileToUpload.map((file, index) => (
                                        <li
                                            key={index}
                                            className="mb-2 flex items-center justify-between"
                                        >
                                            <span>{file.fileName || file.name}</span>
                                            <div className="flex items-center space-x-2" id="view">
                                                <button
                                                    className="bg-purple-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                                    onClick={() => handleUploadFile(file)}
                                                >
                                                    Upload
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                                    onClick={() => handleRemoveFile(index)}
                                                >
                                                    Remove
                                                </button>
                                                <button
                                                    className="bg-blue-700 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                                    onClick={() => showPdf(file)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed z-100 inset-0 overflow-y-auto">
                    <div
                        className="flex items-center justify-center min-h-screen"
                        ref={modalRef}
                    >
                        <div className="fixed inset-0 bg-gray-500 justify=center opacity-75"></div>
                        <div className="z-20 bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
                            {selectedPdfFile && (<h1 className="px-5"><b>{selectedPdfFile.fileName || selectedPdfFile.name}</b></h1>)}
                            <button
                                className="absolute top-0 right-0 mt-4 mr-4 text-red-700 cursor-pointer"
                                onClick={handleCloseModal}
                            >
                                &times; CLOSE
                            </button>
                            <div className="p-6">
                                {selectedPdfFile && <PdfComp props={selectedPdfFile} fetchFromBlockchain={false} />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                {modalContent}
            </Modal>
        </div>
    );
}
export default UploadModal;