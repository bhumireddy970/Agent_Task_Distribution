import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded successfully");
      navigate("/taskdistribute");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 w-full">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-lg text-center">
        <button
          type="button"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg w-50 mb-4"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Upload CSV File
        </h1>

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 border-2 border-gray-300 rounded-lg p-2 mb-4 cursor-pointer 
          file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 
          file:bg-blue-500 file:text-white 
          hover:file:bg-blue-600 transition duration-300"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadCSV;
