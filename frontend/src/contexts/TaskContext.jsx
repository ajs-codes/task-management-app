"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  getTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from "../services/api";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [currentUser, currentPage, searchTerm, status]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks(currentPage, searchTerm, status);
      setTasks(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setCurrentPage(+response.data.meta.currentPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks");
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError("");
      const response = await apiCreateTask(taskData);
      setTasks([...tasks, response.data.data]);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create task");
      throw error;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setError("");
      const response = await apiUpdateTask(id, taskData);
      setTasks(
        tasks.map((task) => (task.id === id ? response.data.data : task))
      );
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task");
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      setError("");
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete task");
      throw error;
    }
  };

  const value = {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    status,
    setStatus,
    refreshTasks: fetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
