// // import { Link, useNavigate } from "react-router-dom";
// // import ToggleSwitch from "./ToggleSwitch";

// // export default function Navbar({ role, setToken }) {
// //   const navigate = useNavigate();

// // // const handleLogout = () => {
// // //   localStorage.clear();
// // //   setToken(null);   // 🔥 THIS IS THE FIX
// // //   navigate("/login");
// // // };


// // const handleLogout = () => {
// //   localStorage.clear();
// //   setToken(null);
// //   setRole(null); // ✅ clear role state
// //   navigate("/login");
// // };




// //   return (
// //     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
// //       <div className="flex gap-4">
// //         <Link to="/" className="font-bold text-lg">
// //           Smart School
// //         </Link>
// //         {role === "student" && (
// //           <>
// //             <Link to="/dashboard">Dashboard</Link>
// //             <Link to="/notices">Notices</Link>
// //           </>
// //         )}
// //         {role === "teacher" && (
// //           <>
// //             <Link to="/teacher">Teacher Dashboard</Link>
// //             <Link to="/notices">Notices</Link>
// //           </>
// //         )}
// //       </div>
// //        <div className="flex items-center gap-4">
// //         {/* Your existing toggle */}
// //         <ToggleSwitch />
      
// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
// //       >
// //         Logout
// //       </button>
// //       </div>
// //     </nav>
// //   );
// // }




























// import { Link, useNavigate } from "react-router-dom";
// import ToggleSwitch from "./ToggleSwitch";

// export default function Navbar({ role, setToken, setRole }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     setToken(null); // remove token state
//     setRole(null);  // remove role state
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//       <div className="flex gap-4">
//         <Link to="/" className="font-bold text-lg">Smart School</Link>

//         {role === "student" && (
//           <>
//             <Link to="/dashboard">Dashboard</Link>
//             <Link to="/notices">Notices</Link>
//           </>
//         )}

//         {role === "teacher" && (
//           <>
//             <Link to="/teacher">Teacher Dashboard</Link>
//             <Link to="/notices">Notices</Link>
//           </>
//         )}
//       </div>

//       <div className="flex items-center gap-4">
//         <ToggleSwitch />

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

















import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ role, setToken, setRole }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-950 text-white px-6 py-4">
      {/* Top row */}
      <div className="flex justify-between items-center">
       <div className="flex items-center gap-2">
          <span className="text-2xl">🏫</span>
          <span className="font-bold text-lg tracking-tight">SmartSchool</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {role === "student" && (
            <>
              <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <Link to="/notices" className="hover:text-blue-200">Notices</Link>
            </>
          )}
          {role === "teacher" && (
            <>
              <Link to="/teacher" className="hover:text-blue-200">Teacher Dashboard</Link>
              <Link to="/notices" className="hover:text-blue-200">Notices</Link>
            </>
          )}
          <button
  onClick={handleLogout}
  title="Logout"
  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 hover:border-red-500 transition-all duration-200 active:scale-95 group"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
</button>
        </div>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 border-t border-blue-500 pt-4">
          {role === "student" && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Dashboard</Link>
              <Link to="/notices" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Notices</Link>
            </>
          )}
          {role === "teacher" && (
            <>
              <Link to="/teacher" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Teacher Dashboard</Link>
              <Link to="/notices" onClick={() => setMenuOpen(false)} className="hover:text-blue-200">Notices</Link>
            </>
          )}
         <button
  onClick={handleLogout}
  title="Logout"
  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 hover:border-red-500 transition-all duration-200 active:scale-95 group"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
</button>
        </div>
      )}
    </nav>
  );
}