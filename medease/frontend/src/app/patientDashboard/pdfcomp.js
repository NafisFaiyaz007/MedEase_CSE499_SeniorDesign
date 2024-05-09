import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import axios from "axios";


const PdfComp = ({ props, fetchFromBlockchain }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isPdf, setIsPdf] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [data, setData] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pdfFile = props;

  useEffect(() => {
    // Determine if the file is a PDF or an image
    setIsPdf(pdfFile.name?.endsWith(".pdf") || pdfFile.fileName?.endsWith(".pdf"));
    setIsImage
      (pdfFile.name?.endsWith(".jpg") ||
        pdfFile.name?.endsWith(".jpeg") ||
        pdfFile.name?.endsWith(".png") ||
        pdfFile.name?.endsWith(".gif") ||
        pdfFile.fileName?.endsWith(".jpg") ||
        pdfFile.fileName?.endsWith(".jpeg") ||
        pdfFile.fileName?.endsWith(".png") ||
        pdfFile.fileName?.endsWith(".gif"))
    if (fetchFromBlockchain == true) {
      getData()
    }
    else {
      setData(pdfFile)
    }
  }, []);

  async function getData() {
    try {
      const body = {
        // UUID: 'doctor1',
        // patientUUID: 'patient1',
        fileID: pdfFile.ID//'patient1_8918a7b97ed45aed0c760ba5d4bbc304fdebe4194eedf22e23c72a105873693b'
      };
      const response = await axios.post(
        "http://localhost:8000/api/users/patient/readFile",
        body,
        {
          responseType: 'blob',
          withCredentials: true
        }

      );

      const data = await response.data;
      console.log(response.data)

      setData(response.data);
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
  }

  return (
    <div className="pdf-div p-5">
      {isPdf && (
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Document file={data} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      )}

      {isImage && <img src={URL.createObjectURL(new Blob([data], { type: 'image/jpeg' }))} alt="Image" />}
    </div>
  );
};

export default PdfComp;
