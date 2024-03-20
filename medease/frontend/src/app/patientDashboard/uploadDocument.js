import React, { useState } from "react";
import { pdfjs } from 'react-pdf';
import PdfComp from "./pdfcomp";
import PdfViewer from "./instagram_pdf";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


const UploadDocuments = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
     const [selectedPdfFile, setSelectedPdfFile] = useState(null);
   
    
  // const [selectedFile, setSelectedFile] = useState(null);
  
  // const [isModalOpen, setIsModalOpen] = useState(false);

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



 const handleCloseModal = () => {
   setSelectedPdfFile(null);
   setIsModalOpen(false);
 };

  
  const showPdf=(pdf) => {
    setPdfFile(`http://localhost:5000/files/${pdf}`)
    setSelectedPdfFile(pdf);
    setIsModalOpen(true);
  }
  

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
                  <button
                    className="bg-blue-700 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    onClick={() => showPdf(file)}
                  >
                    View
                  </button>
                </div>
                {/* {pdfFile && <PdfComp pdfFile={file} />} */}

                {/* {pdfFile && <PdfViewer pdfFile={file} />} */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Modal for PDF viewer */}

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="z-20 bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full p-6 relative">
              <button
                className="absolute top-0 right-0 m-4 text-gray-700 cursor-pointer"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <div className="h-full">
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
