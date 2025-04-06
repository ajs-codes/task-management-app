import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const loginUser = (email, password) => {
  return api.post("/login", { email, password });
};

export const registerUser = (userData) => {
  return api.post("/register", userData);
};

export const getUserProfile = () => {
  return api.get("/profile");
};

// Task API calls
export const getTasks = (page = 1, search = "", status = "") => {
  return api.get(`/tasks?page=${page}&name=${search}&status=${status}`);
};

export const getTaskById = (id) => {
  return api.get(`/tasks/${id}`);
};

export const createTask = (taskData) => {
  return api.post("/tasks", taskData);
};

export const updateTask = (id, taskData) => {
  return api.put(`/tasks/${id}`, taskData);
};

export const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};

export default api;
