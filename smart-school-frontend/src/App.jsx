



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";
// import Notices from "./pages/Notices";
// import PrivateRoute from "./components/PrivateRoute";
// import Navbar from "./components/Navbar";

// // function App() {
// //   const [token, setToken] = useState(localStorage.getItem("token"));
// //   const role = localStorage.getItem("role");

// //   return (
// //     <Router>
// //       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors">
        
// //         {token && <Navbar role={role} setToken={setToken} />}

// //         <Routes>
// //           <Route path="/" element={<Landing />} />
// //           <Route path="/login" element={<Login setToken={setToken} />} />
// //           <Route path="/register" element={<Register />} />

// //           <Route
// //             path="/dashboard"
// //             element={
// //               <PrivateRoute role="student" token={token}>
// //                 <Dashboard />
// //               </PrivateRoute>
// //             }
// //           />

// //           <Route
// //             path="/teacher"
// //             element={
// //               <PrivateRoute role="teacher" token={token}>
// //                 <TeacherDashboard />
// //               </PrivateRoute>
// //             }
// //           />

// //           <Route
// //             path="/notices"
// //             element={
// //               <PrivateRoute token={token}>
// //                 <Notices />
// //               </PrivateRoute>
// //             }
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }




















// function App() {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [role, setRole] = useState(localStorage.getItem("role")); // ✅ role in state

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors">
        
//         {token && <Navbar role={role} setToken={setToken} />}

//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute role="student" token={token}>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/teacher"
//             element={
//               <PrivateRoute role="teacher" token={token}>
//                 <TeacherDashboard />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/notices"
//             element={
//               <PrivateRoute token={token}>
//                 <Notices />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


// export default App;



























import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Notices from "./pages/Notices";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

function AppWrapper() {
  const location = useLocation();
  return <App currentPath={location.pathname} />;
}

function App({ currentPath }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Hide navbar on login and register pages
  const hideNavbar = currentPath === "/login" || currentPath === "/register";

  return (
    <>
      {!hideNavbar && token && <Navbar role={role} setToken={setToken} setRole={setRole} />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="student" token={token}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <PrivateRoute role="teacher" token={token}>
              <TeacherDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/notices"
          element={
            <PrivateRoute token={token}>
              <Notices />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

// Wrap App with Router and useLocation
export default function AppRoot() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
