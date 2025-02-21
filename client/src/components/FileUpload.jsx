import React, { useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import DisplayModal from "./DisplayModal";
import ImageViewer from "./ImageViewer";
import VideoViewer from "./Video";
import PdfViewer from "./PdfViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
export default function FileUpload({ contract, account, provider }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `9b890926650e1efbe558`,
            pinata_secret_api_key: `48413e3e1946000e64c40398cf888612e67dde387e1454ac5fc35aab09bf84c2`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, fileName, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No file selected");
        setFile(null);
        setFilePreview(null);
      } catch (e) {
        console.error(e);
        alert("Unable to upload file to Pinata");
      } finally {
        setUploading(false);
      }
    }
  };

  const retrieveFile = (e) => {
    try {
      const data = e.target.files?.[0];
      if (data) {
        setFile(data);
        setFileName(data.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewFile({
            name: data.name,
            url: reader.result,
          });
          setIsModalOpen(true);
        };
        reader.readAsDataURL(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error in retrieving the file.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block w-full text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-300 ease-in-out"
          >
            Choose File
          </label>
          <input
            disabled={!account || uploading}
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            className="hidden"
          />
        </div>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="border-blue-700 block mx-auto my-4 p-2 border rounded w-80"
        />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className={`bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${
              (!file || uploading) && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </form>
      <DisplayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={previewFile}
      />
    </div>
  );
}
