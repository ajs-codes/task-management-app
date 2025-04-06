"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../contexts/TaskContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const AddTask = () => {
  const { createTask, error } = useTask();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await createTask(values);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating task:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Create New Task</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-6">
            <TaskForm
              onSubmit={handleSubmit}
              buttonText={loading ? "Creating..." : "Create Task"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
