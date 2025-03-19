import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Url } from "./Url";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(Url + "/tasks")
      .then((res) => {
        setTasks(res.data);
        setFilteredTasks(res.data);

        // Extract unique agent names
        const agentNames = Array.from(
          new Set(res.data.map((task) => task.assignedTo?.name).filter(Boolean))
        );
        setAgents(agentNames);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Filter tasks based on the selected agent
  const handleFilterChange = (event) => {
    const agent = event.target.value;
    setSelectedAgent(agent);

    if (agent === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.assignedTo?.name === agent));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 w-full">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>

          {/* Agent Filter Dropdown */}
          <select
            value={selectedAgent}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-lg"
          >
            <option value="All">All Agents</option>
            {agents.map((agent) => (
              <option key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Distributed Tasks
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse shadow-lg">
            <thead>
              <tr className="bg-blue-500 text-white text-lg">
                <th className="p-3">First Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Notes</th>
                <th className="p-3">Agent</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-3 border-b text-center">
                      {task.firstName}
                    </td>
                    <td className="p-3 border-b text-center">{task.phone}</td>
                    <td className="p-3 border-b text-center">{task.notes}</td>
                    <td className="p-3 border-b text-center">
                      {task.assignedTo?.name || "Unassigned"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-600">
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
