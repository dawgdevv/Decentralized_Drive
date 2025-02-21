import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        try {
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          let contractAddress = "0x15E7f7A2707495571d82Fa4CbFFa26C1579F987C";

          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );

          setContract(contract);
          setProvider(provider);
        } catch (error) {
          console.error("Error loading provider:", error);
        }
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        {/* Navigation Bar - Enhanced with rounded corners and better styling */}
        <nav className="bg-gray-800/50 backdrop-blur-sm border-b  border-gray-700/50   rounded-2xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between h-20">
              <div className="flex flex-col ">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600">
                  Decentralized Drive
                </h1>
                <p className="text-gray-400 text-sm">
                  Secure • Decentralized • Private
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-700/50"
                >
                  Home
                </Link>
                <Link
                  to="/display"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-700/50"
                >
                  Display Files
                </Link>
                {!modalOpen && (
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium 
                    transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105"
                    onClick={() => setModalOpen(true)}
                  >
                    Share Files
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Account Info */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-gray-300 font-medium">
                {account
                  ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
                  : "Not connected"}
              </p>
            </div>
          </div>

          {/* Modal */}
          {modalOpen && (
            <Modal setModalOpen={setModalOpen} contract={contract} />
          )}

          {/* Routes */}
          <main className="max-w-4xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl shadow-xl p-8">
                    <div className="space-y-6">
                      <div className="text-center">
                        <h2 className="text-gray-100 text-3xl font-bold mb-2">
                          Upload Files
                        </h2>
                        <p className="text-gray-400">
                          Securely store and share your files on the blockchain
                        </p>
                      </div>
                      <FileUpload
                        account={account}
                        provider={provider}
                        contract={contract}
                      />
                    </div>
                  </div>
                }
              />
              <Route
                path="/display"
                element={<Display contract={contract} account={account} />}
              />
            </Routes>
          </main>

          {/* Enhanced Usage Statement Section */}
          <div className="max-w-4xl mx-auto mt-16 mb-8">
            <div className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-gray-700/30">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  How to Use
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700/20 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/30 transition-all duration-300">
                    <span className="text-blue-400 text-xl font-bold">1</span>
                    <p className="text-gray-300 font-medium mt-2">
                      Connect your wallet to get started
                    </p>
                  </div>
                  <div className="bg-gray-700/20 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/30 transition-all duration-300">
                    <span className="text-blue-400 text-xl font-bold">2</span>
                    <p className="text-gray-300 font-medium mt-2">
                      Upload files to decentralized storage and and supported
                      file formats are PDF, JPG, PNG, GIF, MP4, and WEBM
                    </p>
                  </div>
                  <div className="bg-gray-700/20 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/30 transition-all duration-300">
                    <span className="text-blue-400 text-xl font-bold">3</span>
                    <p className="text-gray-300 font-medium mt-2">
                      Share access with other addresses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
