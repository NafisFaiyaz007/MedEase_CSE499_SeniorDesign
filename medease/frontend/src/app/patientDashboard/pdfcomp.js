import { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfComp = (props) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const { pdfFile } = props;
  // Determine if the file is a PDF or an image
  const isPdf = pdfFile.name.endsWith(".pdf");
  const isImage =
      (pdfFile.name.endsWith(".jpg") ||
      pdfFile.name.endsWith(".jpeg") ||
      pdfFile.name.endsWith(".png") ||
      pdfFile.name.endsWith(".gif"));
  console.log(isImage);

  return (
    <div className="pdf-div">
      {isPdf && (
        <div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
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

      {isImage && <img src={URL.createObjectURL(pdfFile)} alt="Image" />}
    </div>
  );
};

export default PdfComp;
