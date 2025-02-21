import React, { useState, useRef } from "react";
import DisplayModal from "./DisplayModal";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addressRef = useRef(null);

  const getdata = async () => {
    let dataArray;
    const Otheraddress = addressRef.current.value;

    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }

      if (dataArray && dataArray.length > 0) {
        const processedData = dataArray.map((item, i) => ({
          name: item.name,
          url: item.url,
        }));
        setData(processedData);
      } else {
        alert("No files to display");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("You don't have access");
    }
  };

  return (
    <>
      <div className="p-4">
        <input
          type="text"
          placeholder="Enter Address"
          ref={addressRef}
          className="p-2 border rounded mr-2"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={getdata}
        >
          Get Data
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {data.map((item, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-white mb-2">{item.name}</p>
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={() => {
                  setSelectedFile(item);
                  setIsModalOpen(true);
                }}
              >
                Show Data
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedFile && (
        <DisplayModal
          file={selectedFile}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFile(null);
          }}
        />
      )}
    </>
  );
};

export default Display;
