import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import axios from "axios";
import Modal from "../components/modal";

const PdfComp = (props) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isPdf, setIsPdf] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [data, setData] = useState(null)
  const [isAllowed, setIsAllowed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const { pdfFile } = props;
  
  useEffect(() => {
    // Determine if the file is a PDF or an image
    setIsPdf  (pdfFile.name?.endsWith(".pdf") || pdfFile.fileName?.endsWith(".pdf"));
    setIsImage 
        (pdfFile.name?.endsWith(".jpg") ||
        pdfFile.name?.endsWith(".jpeg") ||
        pdfFile.name?.endsWith(".png") ||
        pdfFile.name?.endsWith(".gif") ||
        pdfFile.fileName?.endsWith(".jpg") ||
        pdfFile.fileName?.endsWith(".jpeg") ||
        pdfFile.fileName?.endsWith(".png") ||
        pdfFile.fileName?.endsWith(".gif"))
        getData()
  }, []);
  
  async function getData(){
    try {
      console.log(pdfFile)
      const response = await axios.post(
        "http://localhost:8000/api/users/doctor/readFile",
        {fileID: pdfFile.ID },
        {
          responseType: 'blob',
          withCredentials: true
        }
  
      );
      console.log(response.statusText == "OK")
      const data =  response.data;
      console.log(response.data)
      setIsAllowed(true);
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
      // console.error('Error fetching file:', error);
      if (error.response) {
        // To handle cases where a JSON error message is sent by the server
        const reader = new FileReader();
        reader.onload = () => {
            const errorText = reader.result;
            console.error('Error fetching file:', JSON.parse(errorText).error);
            setModalContent(JSON.parse(errorText).error);
            setModalIsOpen(true);
        };
        reader.readAsText(error.response.data);
    } else {
        // Handle network errors or other issues where the server doesn't respond
        console.error('Error fetching file:', error.message);
    }
    }
  }

  return (
    <div className="pdf-div p-5">
      {isPdf && isAllowed && (
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

      {isImage && isAllowed && <img src={URL.createObjectURL(data)} alt="Image" />}
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default PdfComp;
