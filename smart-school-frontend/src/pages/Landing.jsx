import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";


export default function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔥 If logged in → redirect to dashboard
  useEffect(() => {
    if (token) {
      if (role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/dashboard");
      }
    }
  }, [token, role, navigate]);

return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white">

    {/* Hero Section */}
    <div className="flex-grow flex flex-col items-center justify-center px-6">

      <h1 className="text-5xl font-bold mb-6 text-center">
        Smart School Management System
      </h1>

      <p className="text-lg max-w-2xl text-center mb-8">
        A modern MERN-based platform where students can manage their tasks,
        track progress, and view assignments, while teachers can create
        assignments, publish notices, and monitor student performance.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Register
        </Link>
      </div>

    </div>

    <Footer />

  </div>
);


}
