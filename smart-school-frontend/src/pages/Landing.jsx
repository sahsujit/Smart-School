// import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Footer from "../components/Footer";


// export default function Landing() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // 🔥 If logged in → redirect to dashboard
//   useEffect(() => {
//     if (token) {
//       if (role === "teacher") {
//         navigate("/teacher");
//       } else {
//         navigate("/dashboard");
//       }
//     }
//   }, [token, role, navigate]);

// return (
 


//   <div className="flex flex-col min-h-screen h-screen overflow-hidden bg-blue-950 text-white relative">

//   {/* Blob Accents */}
//   <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
//   <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

//   {/* Hero Section */}
//   <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center">

//     <h1 className="text-5xl font-extrabold mb-6 leading-tight max-w-3xl">
//       Smart School <span className="text-blue-300">Management</span> System
//     </h1>

//     <p className="text-lg max-w-2xl text-gray-300 mb-10">
//       A modern MERN-based platform where students can manage their tasks,
//       track progress, and view assignments, while teachers can create
//       assignments, publish notices, and monitor student performance.
//     </p>

//     <div className="flex gap-4 flex-wrap justify-center">
//       <Link
//         to="/login"
//         className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg"
//       >
//         Login →
//       </Link>

//       <Link
//         to="/register"
//         className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold active:scale-95 transition-all duration-200 shadow-lg"
//       >
//         Register →
//       </Link>
//     </div>

//   </div>

//   {/* Footer */}
//   <div className="relative z-10">
//     <Footer />
//   </div>

// </div>

// );


// }













import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";

export default function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

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
    <div className="flex flex-col min-h-screen bg-blue-950 text-white relative overflow-hidden">

      {/* ── Background Blobs ── */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-600 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-5 border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏫</span>
          <span className="font-bold text-lg tracking-tight">SmartSchool</span>
        </div>
        <div className="flex gap-3">
          <Link
            to="/login"
            className="text-sm text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition-all active:scale-95"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center py-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Now live — MERN Stack Platform
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
          Smart School{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            Management
          </span>{" "}
          System
        </h1>

        <p className="text-base sm:text-lg max-w-2xl text-gray-300 mb-10 leading-relaxed">
          A modern platform where <span className="text-blue-300 font-medium">students</span> manage tasks
          and track progress, while <span className="text-purple-300 font-medium">teachers</span> create
          assignments, publish notices, and monitor performance.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mb-16">
          <Link
            to="/login"
            className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg"
          >
            Login →
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-400 text-white px-7 py-3 rounded-xl font-semibold active:scale-95 transition-all duration-200 shadow-lg border border-blue-400"
          >
            Register →
          </Link>
        </div>

        {/* ── Feature Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-2xl mb-3">📋</div>
            <h3 className="font-semibold text-white mb-1">Task Management</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Students can add, complete, and track their personal tasks with a live progress bar.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-2xl mb-3">📢</div>
            <h3 className="font-semibold text-white mb-1">Notice Board</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Teachers post categorized notices instantly visible to all students on the platform.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-semibold text-white mb-1">Progress Tracking</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Teachers monitor each student's progress in real time from a clean dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}