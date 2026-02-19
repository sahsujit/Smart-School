import axios from "axios";

// Use environment variable for baseURL
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // for Vite
  // For Next.js: process.env.NEXT_PUBLIC_API_URL
});

// Automatically add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
