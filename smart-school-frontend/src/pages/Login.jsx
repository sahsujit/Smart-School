


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      // save token and role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // update App state
      setToken(res.data.token);
      setRole(res.data.role);

      // navigate based on role
      if (res.data.role === "teacher") navigate("/teacher");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 
                    bg-gray-100 dark:bg-gray-900 
                    text-black dark:text-white 
                    transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

      <form 
        onSubmit={handleLogin} 
        className="flex flex-col gap-4 w-80 
                   bg-white dark:bg-gray-800 
                   p-6 rounded-lg shadow-lg 
                   transition-colors duration-300"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 
                     text-black dark:text-white 
                     p-2 rounded focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 
                     text-black dark:text-white 
                     p-2 rounded focus:outline-none focus:ring-2 
                     focus:ring-blue-500"
          required
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 
                     text-white px-4 py-2 rounded 
                     mt-2 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}






