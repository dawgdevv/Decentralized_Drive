import React from "react";
import ReactPlayer from "react-player";

const VideoViewer = ({ url }) => {
  return (
    <video
      controls
      className="max-w-full max-h-[70vh] mx-auto"
      style={{ display: "block" }}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoViewer;
