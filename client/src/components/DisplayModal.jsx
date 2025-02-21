import React from "react";
import PdfViewer from "./PdfViewer";
import ImageViewer from "./ImageViewer";
import VideoViewer from "./Video";

const DisplayModal = ({ file, onClose, isOpen }) => {
  if (!isOpen || !file) return null;

  const { name = "", url = "" } = file;
  const fileType = name.split(".").pop().toLowerCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-white text-lg">{name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded"
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex justify-center items-center">
          {fileType === "pdf" ? (
            <PdfViewer url={url} />
          ) : ["jpg", "jpeg", "png", "gif"].includes(fileType) ? (
            <ImageViewer url={url} />
          ) : ["mp4", "webm"].includes(fileType) ? (
            <VideoViewer url={url} />
          ) : (
            <p className="text-white">Unsupported file type</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayModal;
