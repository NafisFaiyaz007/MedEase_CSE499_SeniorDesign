'use client'
import React, { useState } from 'react';
import axios from "axios";
import { pdfjs } from 'react-pdf';
import PdfViewer from '../patientDashboard/instagram_pdf';
import PdfComp from "../patientDashboard/pdfcomp";

// import { Document, Page, pdfjs } from '@react-pdf/renderer';

const getFile = () => {

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
  const [fileContent, setFileContent] = useState(null);
  const [pdfData, setPdfData] = useState(null);


  const handleView = async () => {
    try {
      const body = {
        UUID: 'doctor1',
        patientUUID: 'patient1',
        fileID: 'patient1_8918a7b97ed45aed0c760ba5d4bbc304fdebe4194eedf22e23c72a105873693b'
      };
        const response = await axios.post(
            "http://localhost:8000/api/users/patient/readFile",
            body,
            { responseType: 'blob' }
            
          );

      const data = await response.data;
      console.log(response.data)

      setPdfData(response.data);
      // URL.createObjectURL(object)

//       const pdfDoc = new jsPDF();
//       const decodedData = Uint8Array.from(atob(data), c => c.charCodeAt(0));
//       pdfDoc.addImage(decodedData, 'PNG', 0, 0);

// // Display or download the decoded PDF (implementation specific)
// pdfDoc.output('dataurlnewwindow');

      // const reader = new FileReader();
      // reader.onload = () => {
      //   setPdfData(reader.result);
      // };
      // reader.readAsDataURL(data);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  return (
    <div>
        <h1>asds</h1>
      <button onClick={handleView}>View File</button>
      {/* {fileContent && <pre>{fileContent}</pre>} */}
      <div>
      {pdfData && (
        // <embed src={pdfData} type="application/pdf" width="100%" height="600px" />
        // <PdfViewer pdf={fileContent} />
        // <embed src={`data:application/pdf;base64,${fileContent}`} type="application/pdf" width="100%" height="600px" />
        <PdfComp pdfFile={pdfData} />
        
      )}
    </div>
    </div>
    
  );
};

export default getFile;
