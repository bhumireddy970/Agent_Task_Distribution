import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Url } from "./Url";

const AgentManagement = () => {
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get(Url + "/agents");
      setAgents(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleChange = (e) => {
    setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
  };

  const addAgent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_BASE_URL, newAgent);
      setAgents([...agents, response.data]);
      setNewAgent({ name: "", email: "", mobile: "", password: "" });
    } catch (error) {
      console.error("Error adding agent:", error);
    }
  };

  const removeAgent = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setAgents(agents.filter((agent) => agent._id !== id));
    } catch (error) {
      console.error("Error removing agent:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 w-full">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-6xl flex">
        <div className="w-1/3 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg w-full mb-4"
            onClick={() => navigate("/dashboard")}
          >
            Back
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Add Agent</h2>
          <form onSubmit={addAgent} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={newAgent.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="p-3 border rounded w-full"
            />
            <input
              type="email"
              name="email"
              value={newAgent.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="p-3 border rounded w-full"
            />
            <input
              type="text"
              name="mobile"
              value={newAgent.mobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
              className="p-3 border rounded w-full"
            />
            <input
              type="password"
              name="password"
              value={newAgent.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="p-3 border rounded w-full"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg w-full"
            >
              Add Agent
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="w-2/3 p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-white">
            Agent List
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white bg-opacity-80 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-white">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Mobile</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent._id} className="border">
                    <td className="p-3 border text-center">{agent.name}</td>
                    <td className="p-3 border text-center">{agent.email}</td>
                    <td className="p-3 border text-center">{agent.mobile}</td>
                    <td className="p-3 border text-center">
                      <button
                        onClick={() => removeAgent(agent._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentManagement;
