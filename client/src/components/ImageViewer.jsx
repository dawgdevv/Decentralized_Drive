import React from "react";

const ImageViewer = ({ url }) => {
  if (!url) return null;

  return (
    <div className="flex justify-center items-center">
      <img
        src={url}
        alt="Preview"
        className="max-w-full max-h-[60vh] object-contain"
        onError={(e) => {
          console.error("Error loading image");
          e.target.src = "fallback-image-url"; // Optional: Add a fallback image
        }}
      />
    </div>
  );
};

export default ImageViewer;
