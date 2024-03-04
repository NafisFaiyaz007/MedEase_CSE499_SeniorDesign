import React, { useState } from "react";
import Modal from "react-modal";
import ReactFileViewer from "react-file-viewer";


const FileViewerModal = ({ isOpen, onClose, file }) => {
  const [error, setError] = useState(null);

  const fileTypes = {
    // Define file types and corresponding viewer components
    pdf: "PdfViewer",
    docx: "DocxViewer",
    // Add more as needed
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
  };

  const viewerType =
    fileTypes[getFileExtension(file.name)] || "UnsupportedViewer";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="File Viewer Modal"
      className="file-viewer-modal"
      overlayClassName="file-viewer-overlay"
      appElement={document.getElementById("root")} // Assuming that '#root' is the ID of your root element
    
      >
      {error ? (
        <div>Error loading the file.</div>
      ) : (
        <ReactFileViewer
          fileType={viewerType}
          filePath={file.url}
          onError={(e) => setError(e)}
        />
      )}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};
export default FileViewerModal