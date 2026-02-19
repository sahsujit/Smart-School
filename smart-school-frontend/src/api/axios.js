// import axios from "axios";

// // Base URL of your backend
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Add JWT token to headers if exists
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;



// import axios from "axios";

// // Base URL of your backend
// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // Make sure your Express server is running here
// });

// // Add a request interceptor to automatically include JWT token
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // your JWT stored here
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;









// api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // make sure you store JWT on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
