import React, { useState, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "./pdfcomp";
import SendFileModal from "./sendFileModal";
import axios from "axios";
import Modal from "../components/modal";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const UploadDocuments = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [fileToUpload, setFileToUpload] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendFileModalOpen, setIsSendFileModalOpen] = useState(false);
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [exists, setExists] = useState(false);
  const modalRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const isRegistered = async () => {
      axios
        .get("http://localhost:8000/api/users/patient/isRegistered", {
          withCredentials: true,
        })
        .then((response) => {
          setIsRegistered(response.data);
          console.log(response)
          getFiles();
        })
        .catch((error) => {
          console.error("err: ", error.response.data.error)
          if (error.response.data.error == false) {
            setModalContent("You are not registered in the blockchain");
            setModalIsOpen(true);
          }
        });
    };
    isRegistered();
    

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

  const getFiles = async () => {
    axios
      .post("http://localhost:8000/api/users/patient/getFiles", null, {
        withCredentials: true,
      })
      .then((response) => setUploadedFiles(response.data))
      .catch((error) => {
        // console.error("err: ", error.response.data.error)
        setModalContent(error.response.data.error);
        setModalIsOpen(true);
      });
  };

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

      // const data = await response.data;
      console.log(response.data.message)
      const data = response.data.message;
      console.log(data)
      setFileToUpload([])
      setModalContent(data);
      setModalIsOpen(true);
      getFiles();

    } catch (error) {
      // console.error('Error fetching file:', error);
      setModalContent(error.response.data.error);
      setModalIsOpen(true);
    }
  };

  const handleDownloadFile = async (file) => {
    console.log("handle download file");
    // console.log(file);
    try {
      // Create a FormData object
      const formData = new FormData();
      // Append the file to the FormData object
      console.log("id: "+ file.ID)
      formData.append("file", file);
      formData.append("fileName", file.name)
      formData.append("accessList", []);
      formData.append("fileID", file.ID);
      const body = {
        fileID: file.ID//'patient1_8918a7b97ed45aed0c760ba5d4bbc304fdebe4194eedf22e23c72a105873693b'
      };
      const response = await axios.post(
        "http://localhost:8000/api/users/patient/download",
        body,
        { responseType:'blob', withCredentials: true }

      );
      if (response.data) {
        let contentType;
        if(file.name?.endsWith(".pdf")){
         contentType = "application/pdf";
        } else {
          contentType = "image/png"
        }
        const blob = new Blob([response.data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = file.name;  // Default file name
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
    }
    

    } catch (error) {
      // console.error('Error fetching file:', error);
      setModalContent(error.response?.data?.error || 'An unexpected error occurred');
      setModalIsOpen(true);
    }

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
    console.log(pdf);
    setSelectedPdfFile(pdf);
    setIsModalOpen(true);
  };
  const filteredFiles = uploadedFiles.filter(file =>
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {isRegistered && (<div>
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
      </div></div>)}

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
                    className="bg-emerald-600 text-white px-2 py-1 rounded-md hover:bg-emerald-700"
                    onClick={() => handleUploadFile(file)}
                  >
                    Upload
                  </button>
                  {/* <button
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </button> */}
                  {/* <button
                    className="bg-sky-600 text-white px-2 py-1 rounded-md hover:bg-sky-700"
                    onClick={() => handleSendFile(file)}
                  >
                    Manage Access
                  </button> */}
                  <button
                    className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700"
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
      {filteredFiles.length > 0 && (
        <div className="bg-white p-4 rounded-md shadow-md" id="root">
          <input
            type="text"
            placeholder={`Search`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Uploaded Files:
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {filteredFiles.map((file, index) => (
              <li
                key={index}
                className="mb-2 flex items-center justify-between"
              >
                <span>{file.fileName || file.name}</span>
                <div className="flex items-center space-x-2" id="view">
                  {/* <button
                    className="bg-emerald-600 text-white px-2 py-1 rounded-md hover:bg-emerald-700"
                    onClick={() => handleDownloadFile(file)}
                  >
                    Download
                  </button> */}
                  {/* <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-green-700"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </button> */}
                  <button
                    className="bg-sky-600 text-white px-2 py-1 rounded-md hover:bg-sky-700"
                    onClick={() => handleSendFile(file)}
                  >
                    Manage Access
                  </button>
                  <button
                    className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-600"
                    onClick={() => {
                      setExists(true);
                      showPdf(file)
                    }}
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
        <SendFileModal handleClose={SendFileHandleCloseModal} currentFile={selectedPdfFile} />
      )}
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
                {selectedPdfFile && <PdfComp props={selectedPdfFile} fetchFromBlockchain={exists} />}
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
};

export default UploadDocuments;
