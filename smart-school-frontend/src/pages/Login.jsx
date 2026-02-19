


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


<div className="min-h-screen h-screen overflow-hidden flex flex-col justify-center items-center p-6 relative bg-blue-950 transition-colors duration-300">

  {/* Blob Accents */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

  <form
    onSubmit={handleLogin}
    className="relative z-10 flex flex-col gap-4 w-80
               bg-white/10 dark:bg-gray-900/60
               backdrop-blur-md
               border border-white/20
               p-6 rounded-2xl shadow-2xl
               transition-colors duration-300"
  >
    {/* Title */}
    <h2 className="text-3xl font-extrabold text-center text-white">
      Login
    </h2>

    <p className="text-center text-gray-300 text-sm mb-2">
      Login to your account to continue
    </p>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border border-white/30
                 bg-white/10
                 text-white
                 placeholder-gray-400
                 p-2.5 rounded-lg text-sm
                 focus:border-blue-400
                 focus:ring-2 focus:ring-blue-400/40
                 outline-none transition backdrop-blur-sm"
      required
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
                 p-2.5 rounded-lg text-sm
                 focus:border-blue-400
                 focus:ring-2 focus:ring-blue-400/40
                 outline-none transition backdrop-blur-sm"
      required
    />

    {error && (
      <div className="bg-red-500/20 border border-red-400/50 text-red-300 text-sm p-2.5 rounded-lg">
        ⚠️ {error}
      </div>
    )}

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-500 active:scale-95
                 text-white font-semibold py-2.5 rounded-lg
                 mt-2 transition-all duration-200
                 shadow-lg shadow-blue-600/30"
    >
      Login
    </button>

    {/* Register Redirect */}
    <p className="text-center text-sm text-gray-400 mt-2">
      Don't have an account?{" "}
      <a
        href="/register"
        className="text-blue-300 hover:underline font-medium"
      >
        Sign up
      </a>
    </p>
  </form>
</div>


  );
}






