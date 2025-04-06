"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../contexts/TaskContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { getTaskById } from "../services/api";

const EditTask = () => {
  const { id } = useParams();
  const { updateTask, error } = useTask();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id);
        const taskData = response.data.data;

        // Format dates for the form
        if (taskData.startDate) {
          taskData.startDate = new Date(taskData.startDate)
            .toISOString()
            .split("T")[0];
        }
        if (taskData.endDate) {
          taskData.endDate = new Date(taskData.endDate)
            .toISOString()
            .split("T")[0];
        }

        setTask(taskData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        navigate("/dashboard");
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      await updateTask(id, values);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto py-6 px-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="container mx-auto py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Task</h1>
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
              initialValues={task}
              onSubmit={handleSubmit}
              buttonText={submitting ? "Updating..." : "Update Task"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
