import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import axios from "axios";
import Modal from "../components/modal";

const PdfComp = ({props, fetchFromBlockchain}) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [isPdf, setIsPdf] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [data, setData] = useState(null)
  const [isAllowed, setIsAllowed] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [permissionModal, setPermissionModal] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pdfFile = props;
  
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
        if (fetchFromBlockchain == true) {
          console.log("inside: "+ fetchFromBlockchain);
          getData()
        }
        else {
          console.log("outside: "+ fetchFromBlockchain);
          setIsAllowed(true)
          setData(pdfFile)
        }
  }, []);
  
  async function getData(){
    try {
      console.log(pdfFile)
      const response = await axios.post(
        "http://localhost:8000/api/users/doctor/readFile",
        {fileID: pdfFile.ID, 
          ownerID: pdfFile.ownerID
         },
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
            // setModalIsOpen(true);
            setPermissionModal(true)
        };
        reader.readAsText(error.response.data);
    } else {
        // Handle network errors or other issues where the server doesn't respond
        console.error('Error fetching file:', error.message);
    }
    }
  }
  function closeModal() {
    document.getElementById('my-modal').style.display = 'none';
    setPermissionModal(false)
}

async function askPermission() {
    // Implement the function to ask for permissions
    console.log('Asking for permission...');
    const response = await axios.post(
      "http://localhost:8000/api/users/askPermission",
      {fileName: pdfFile.fileName,
        ownerID: pdfFile.ownerID
       },
      {
        withCredentials: true
      }

    );
    console.log(response.statusText == "OK")
    closeModal();  // Optionally close the modal after the action
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

      {isImage && isAllowed && <img src={URL.createObjectURL(new Blob([data], { type: 'image/jpeg' }))} alt="Image" />}
      {/* <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {modalContent}
      </Modal> */}
      {!isAllowed && permissionModal && (<div>
<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal"></div>


<div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">

    <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Notification</h3>

        <div className="mt-2 px-7 py-5"> 
            <p className="text-sm text-gray-500">{modalContent}</p>
        </div>
    </div>


    <div className="flex justify-around p-4">
        <button className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-400" onClick={()=> {closeModal()}}>Close</button>
        <button className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-blue-700" onClick={()=> {askPermission()}}>Ask Permission</button>
    </div>
</div>
</div>)
}
    </div>
    
  );
};

export default PdfComp;
