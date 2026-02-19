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
 


  <div className="flex flex-col min-h-screen h-screen overflow-hidden bg-blue-950 text-white relative">

  {/* Blob Accents */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

  {/* Hero Section */}
  <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center">

    <h1 className="text-5xl font-extrabold mb-6 leading-tight max-w-3xl">
      Smart School <span className="text-blue-300">Management</span> System
    </h1>

    <p className="text-lg max-w-2xl text-gray-300 mb-10">
      A modern MERN-based platform where students can manage their tasks,
      track progress, and view assignments, while teachers can create
      assignments, publish notices, and monitor student performance.
    </p>

    <div className="flex gap-4 flex-wrap justify-center">
      <Link
        to="/login"
        className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg"
      >
        Login →
      </Link>

      <Link
        to="/register"
        className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold active:scale-95 transition-all duration-200 shadow-lg"
      >
        Register →
      </Link>
    </div>

  </div>

  {/* Footer */}
  <div className="relative z-10">
    <Footer />
  </div>

</div>

);


}
