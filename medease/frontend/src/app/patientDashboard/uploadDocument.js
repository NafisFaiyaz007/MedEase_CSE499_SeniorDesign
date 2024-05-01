import React, { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "./pdfcomp";
import SendFileModal from "./sendFileModal";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const UploadDocuments = () => {
  const [fileToUpload, setFileToUpload] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendFileModalOpen, setIsSendFileModalOpen] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const getFiles = async () => {
      axios
        .post("http://localhost:8000/api/users/patient/getFiles", null, {
          withCredentials: true,
        })
        .then((response) => setUploadedFiles(response.data))
        .catch((error) => console.error("Error fetching user:", error));
    };

    getFiles();

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveFile = async (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleSendFile = async (file) => {
    setSelectedPdfFile(file);
    setIsSendFileModalOpen(true);
  };

  const handleChooseFile = async (file) => {
    // setUploadedFiles((prevFiles) => [...prevFiles, file]);
    setFileToUpload((prevFiles) => [...prevFiles, file]);
  };

  const handleUploadFile = async (file) => {
    try {
      // Create a FormData object
      const formData = new FormData();
      // Append the file to the FormData object
      formData.append("file", file);
      formData.append("fileName", file.name)
      formData.append("accessList", []);
      const body = {
        fileName: file.name//'patient1_8918a7b97ed45aed0c760ba5d4bbc304fdebe4194eedf22e23c72a105873693b'
      };
      const response = await axios.post(
        "http://localhost:8000/api/users/patient/uploadFile",
        formData,
        {
          //responseType: 'blob',
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct Content-Type header
          },
          withCredentials: true
        }

      );

      const data = await response.data;
      console.log(response.data)

    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const handleDownloadFile = async (file) => {
    console.log("handle download file");
    console.log(file);
  };

  const handleCloseModal = () => {
    setSelectedPdfFile(null);
    setIsModalOpen(false);
  };

  const SendFileHandleCloseModal = () => {
    setSelectedPdfFile(null);
    setIsSendFileModalOpen(false); // Fixed typo here
  };

  const showPdf = (pdf) => {
    // setCurrentFileID(`http://localhost:5000/files/${pdf}`);
    setSelectedPdfFile(pdf);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
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
      {fileToUpload.length > 0 && (
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
                    className="bg-green-700 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    onClick={() => handleSendFile(file)}
                  >
                    Manage Access
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
      )}
      {uploadedFiles.length > 0 && (
        <div className="bg-white p-4 rounded-md shadow-md" id="root">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Uploaded Files:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="mb-2 flex items-center justify-between"
              >
                <span>{file.fileName || file.name}</span>
                <div className="flex items-center space-x-2" id="view">
                  <button
                    className="bg-purple-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    onClick={() => handleDownloadFile(file)}
                  >
                    Download
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-green-700 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    onClick={() => handleSendFile(file)}
                  >
                    Manage Access
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
      )}
      {isSendFileModalOpen && (
        <SendFileModal handleClose={SendFileHandleCloseModal} currentFile={selectedPdfFile.ID} />
      )}
      {isModalOpen && (
        <div className="fixed z-100 inset-0 overflow-y-auto">
          <div
            className="flex items-center justify-center min-h-screen"
            ref={modalRef}
          >
            <div className="fixed inset-0 bg-gray-500 justify=center opacity-75"></div>
            <div className="z-20 bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-red-700 cursor-pointer"
                onClick={handleCloseModal}
              >
                &times; CLOSE
              </button>
              <div className="p-6">
                {selectedPdfFile && <PdfComp pdfFile={selectedPdfFile} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
