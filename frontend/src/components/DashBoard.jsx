import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaTasks,
  FaFileUpload,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 p-10 w-full">
      {/* Logout Button (Top Right) */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      <div className="bg-white p-40 rounded-lg shadow-lg w-full max-w-4xl mt-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent Management */}
          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition transform hover:scale-105 "
            onClick={() => navigate("/addagent")}
          >
            <FaUserShield className="text-blue-500 text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-center text-gray-700">
              Agent Management
            </h3>
          </div>

          {/* Task Distribution */}
          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => navigate("/taskdistribute")}
          >
            <FaTasks className="text-green-500 text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-center text-gray-700">
              Task Distribution
            </h3>
          </div>

          {/* Upload CSV */}
          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => navigate("/uploadcsv")}
          >
            <FaFileUpload className="text-purple-500 text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-center text-gray-700">
              Upload CSV
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
