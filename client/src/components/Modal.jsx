import React, { useEffect } from "react";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const addressInput = document.querySelector(".address");
    if (addressInput) {
      const address = addressInput.value;
      try {
        await contract.allow(address);
        setModalOpen(false);
        alert("Access granted successfully!");
      } catch (error) {
        console.error("Error sharing access:", error);
        alert("Failed to grant access. Please try again.");
      }
    }
  };

  const revoking = async () => {
    const addressInput = document.querySelector(".address");
    if (addressInput) {
      const address = addressInput.value;
      try {
        await contract.disallow(address);
        setModalOpen(false);
        alert("Access revoked successfully!");
      } catch (error) {
        console.error("Error revoking access:", error);
        alert("Failed to revoke access. Please try again.");
      }
    }
  };

  useEffect(() => {
    const accessList = async () => {
      try {
        const addressList = await contract.shareAccess();
        const select = document.querySelector("#selectNumber");
        if (select && addressList.length > 0) {
          addressList.forEach((opt) => {
            const option = document.createElement("option");
            option.textContent = `${opt.slice(0, 6)}...${opt.slice(-4)}`;
            option.value = opt;
            select.appendChild(option);
          });
        }
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Share Access</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              className="address w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter wallet address"
            />
          </div>

          {/* Previously Shared Addresses */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Previously Shared With
            </label>
            <select
              name="selectNumber"
              id="selectNumber"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select address</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={sharing}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Share
            </button>
            <button
              onClick={revoking}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
