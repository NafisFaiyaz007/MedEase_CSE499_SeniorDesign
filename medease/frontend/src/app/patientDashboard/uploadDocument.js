import React, { useState } from "react";
import { create } from "ipfs-http-client";

const apiKey = "c1d1d437336b46dc8b66cf24d67fd2ba";
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Bearer ${apiKey}`,
  },
});

const UploadDocuments = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleRemoveFile = async (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };
  const handleSendFile = async (file) => {
    console.log("handle remove file");
  };
  const handleUploadFile = async (file) => {
    // Implement logic to upload the file
    console.log("Uploading file:", file);
    try {
      // Read the file content
      const fileBuffer = await file.arrayBuffer();

      // Upload file to IPFS
      const result = await ipfs.add({ content: fileBuffer });
      const ipfsHash = result.cid.toString();

      console.log("File uploaded to IPFS. IPFS Hash:", ipfsHash);

      // Update state with the IPFS hash or perform further actions
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        { name: file.name, ipfsHash },
      ]);
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
    }
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleDownloadFile = async (file) => {
    try {
      // Fetch file from IPFS using its hash
      const fileContent = await ipfs.cat(file.ipfsHash);

      // Convert file content to a Blob
      const blob = new Blob([fileContent], {
        type: "application/octet-stream",
      });

      // Create a download link and trigger a click event to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name;
      link.click();
    } catch (error) {
      console.error("Error downloading file from IPFS:", error);
    }
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
        <div className="bg-white p-4 rounded-md shadow-md">
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
                <div className="flex items-center space-x-2">
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;
