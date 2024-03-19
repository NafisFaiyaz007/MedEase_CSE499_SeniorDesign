import React, { useState } from "react";
// import FileViewerModal from'./fileViewerModal'; 
// import Modal from "react-modal";
// import {pdfjs} from 'react-pdf';
// import PDFViewer from "./PDFViewer";
import PdfViewer from "./instagram_pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


const UploadDocuments = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveFile = async (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleSendFile = async (file) => {
    console.log("handle send file");
  };

  const handleUploadFile = async (file) => {
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleDownloadFile = async (file) => {
    console.log("handle download file");
  };

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    setFile(newFile);
  };

 const handleOpenModal = (file) => {
   // Pass file as an argument
   setSelectedFile(file); // Store the selected file for viewing
   setIsModalOpen(true);
 };

 const handleCloseModal = () => {
   setIsModalOpen(false);
   setSelectedFile(null); // Clear the selected file when closing
 };

 const openFileViewer=() => {
  <PdfViewerComponent
    document={"file"}
    />
 }
  const [showPdfViewer, setShowPdfViewer] = useState(null);

  const handleViewButtonClick = () => {
    setShowPdfViewer(true);
  };

  const handleClosePdfViewer = () => {
    setShowPdfViewer(false);
  };
  

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">
        Upload/View Documents
      </h2>
      {/* Upload File Section */}
      <div className="mb-4">
        <label htmlFor="fileInput" className="block text-white mb-2">
          Choose File:
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => handleUploadFile(e.target.files[0])}
          className="border p-2"
        />
      </div>
      {/* View Uploaded Files Section */}
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
                <span>{file.name}</span>
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
                    Send
                  </button>
                  <button onClick="">View</button>
                </div>
              </li>
            ))}
          </ul>

          <PdfViewer pdf={file}/>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
