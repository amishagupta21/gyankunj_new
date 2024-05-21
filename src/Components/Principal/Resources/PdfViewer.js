import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { Button, CircularProgress } from "@mui/material";

const PdfViewer = ({ data }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState();

  // Function to convert base64 to Blob
  const base64toBlob = (base64Data) => {
    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "application/pdf" });
  };

  useEffect(() => {
    if(data){
        const base64Data = data;
        const blob = base64toBlob(base64Data);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        handlePageChange(1);
    }
  }, [data])

  const handlePrevPage = () => {
    handlePageChange(pageNumber - 1);
  };

  const handleNextPage = () => {
    handlePageChange(pageNumber + 1);
  };

  const handlePageChange = (newPage) => {
    setLoading(true);
    setPageNumber(newPage);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [pageNumber]);

  return (
    <div className="bg-body-secondary h-100 p-3 overflow-auto">
      <div className="pdf-buttons mb-2 d-flex justify-content-between align-items-center">
        <p className="page-count fw-bold mb-0">
          Page {pageNumber} of {numPages || "..."}
        </p>
        <div>
          <Button
            className="me-2"
            variant="contained"
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={pageNumber === numPages || !numPages}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="pdf-content">
        {loading ? (
          <div className="text-center w-100 mt-5">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <Document
            className="w-100"
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
