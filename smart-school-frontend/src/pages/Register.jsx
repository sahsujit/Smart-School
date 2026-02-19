import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { setToken } from "../utils/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password, role });

      // Save token and role
      setToken(res.data.token);
      localStorage.setItem("role", res.data.role);

      // Navigate based on role
      if (res.data.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    


    <div className="min-h-screen h-screen overflow-hidden flex flex-col justify-center items-center p-6 relative bg-blue-950">

  {/* Blob Accents */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

  <div className="relative z-10 bg-white/10 dark:bg-gray-900/60 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-6 w-full max-w-sm mx-auto transition-colors duration-300">
    
    <h2 className="text-3xl font-extrabold text-center text-white mb-4">
      Register
    </h2>

    <form onSubmit={handleRegister} className="flex flex-col gap-3">
      
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-white/30
                   bg-white/10
                   text-white
                   placeholder-gray-400
                   focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40
                   outline-none p-2.5 rounded-lg text-sm transition backdrop-blur-sm"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-white/30
                   bg-white/10
                   text-white
                   placeholder-gray-400
                   focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40
                   outline-none p-2.5 rounded-lg text-sm transition backdrop-blur-sm"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-white/30
                   bg-white/10
                   text-white
                   placeholder-gray-400
                   focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40
                   outline-none p-2.5 rounded-lg text-sm transition backdrop-blur-sm"
      />

      {/* Role Selection */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border border-white/30
                   bg-indigo-900/60
                   text-white
                   focus:border-blue-400 focus:ring-2 focus:ring-blue-400/40
                   outline-none p-2.5 rounded-lg text-sm transition backdrop-blur-sm"
      >
        <option value="student" className="bg-indigo-900">Student</option>
        <option value="teacher" className="bg-indigo-900">Teacher</option>
      </select>

      {error && (
        <div className="bg-red-500/20 border border-red-400/50 text-red-300 text-sm p-2.5 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      <button
        className="bg-blue-600 hover:bg-blue-500 active:scale-95
                   text-white font-semibold py-2.5 rounded-lg mt-2
                   transition-all duration-200 shadow-lg shadow-blue-600/30"
      >
        Register
      </button>

      <p className="text-center text-sm text-gray-400 mt-1">
        Already have an account?{" "}
        <a href="/login" className="text-blue-300 hover:underline font-medium">
          Log in
        </a>
      </p>

    </form>
  </div>
</div>

  );
}
