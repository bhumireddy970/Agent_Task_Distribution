// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/DashBoard";
import AddAgent from "./components/AddManagement";
import UploadCSV from "./components/UploadCSV";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/taskdistribute" element={<TaskList />} />
          <Route path="/uploadcsv" element={<UploadCSV />} />
          <Route path="/addagent" element={<AddAgent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
