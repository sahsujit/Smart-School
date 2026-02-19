// import { Link, useNavigate } from "react-router-dom";
// import ToggleSwitch from "./ToggleSwitch";

// export default function Navbar({ role, setToken }) {
//   const navigate = useNavigate();

// // const handleLogout = () => {
// //   localStorage.clear();
// //   setToken(null);   // 🔥 THIS IS THE FIX
// //   navigate("/login");
// // };


// const handleLogout = () => {
//   localStorage.clear();
//   setToken(null);
//   setRole(null); // ✅ clear role state
//   navigate("/login");
// };




//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//       <div className="flex gap-4">
//         <Link to="/" className="font-bold text-lg">
//           Smart School
//         </Link>
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
//        <div className="flex items-center gap-4">
//         {/* Your existing toggle */}
//         <ToggleSwitch />
      
//       <button
//         onClick={handleLogout}
//         className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//       </div>
//     </nav>
//   );
// }




























import { Link, useNavigate } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";

export default function Navbar({ role, setToken, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken(null); // remove token state
    setRole(null);  // remove role state
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="font-bold text-lg">Smart School</Link>

        {role === "student" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/notices">Notices</Link>
          </>
        )}

        {role === "teacher" && (
          <>
            <Link to="/teacher">Teacher Dashboard</Link>
            <Link to="/notices">Notices</Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ToggleSwitch />

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
