import React from "react";
import { Document, Page } from "react-pdf";

const PdfViewer = ({ url }) => {
  return (
    <div className="max-w-full max-h-[70vh] overflow-auto">
      <Document
        file={url}
        className="max-w-full"
        loading={<p className="text-white">Loading PDF...</p>}
      >
        <Page
          pageNumber={1}
          scale={1.0}
          className="max-w-full"
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default PdfViewer;
