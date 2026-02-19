


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// export default function Login({ setToken, setRole }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", { email, password });

//       // save token and role in localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);

//       // update App state
//       setToken(res.data.token);
//       setRole(res.data.role);

//       // navigate based on role
//       if (res.data.role === "teacher") navigate("/teacher");
//       else navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (


// <div className="min-h-screen h-screen overflow-hidden flex flex-col justify-center items-center p-6 relative bg-blue-950 transition-colors duration-300">

//   {/* Blob Accents */}
//   <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
//   <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

//   <form
//     onSubmit={handleLogin}
//     className="relative z-10 flex flex-col gap-4 w-80
//                bg-white/10 dark:bg-gray-900/60
//                backdrop-blur-md
//                border border-white/20
//                p-6 rounded-2xl shadow-2xl
//                transition-colors duration-300"
//   >
//     {/* Title */}
//     <h2 className="text-3xl font-extrabold text-center text-white">
//       Login
//     </h2>

//     <p className="text-center text-gray-300 text-sm mb-2">
//       Login to your account to continue
//     </p>

//     <input
//       type="email"
//       placeholder="Email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       className="border border-white/30
//                  bg-white/10
//                  text-white
//                  placeholder-gray-400
//                  p-2.5 rounded-lg text-sm
//                  focus:border-blue-400
//                  focus:ring-2 focus:ring-blue-400/40
//                  outline-none transition backdrop-blur-sm"
//       required
//     />

//     <input
//       type="password"
//       placeholder="Password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       className="border border-white/30
//                  bg-white/10
//                  text-white
//                  placeholder-gray-400
//                  p-2.5 rounded-lg text-sm
//                  focus:border-blue-400
//                  focus:ring-2 focus:ring-blue-400/40
//                  outline-none transition backdrop-blur-sm"
//       required
//     />

//     {error && (
//       <div className="bg-red-500/20 border border-red-400/50 text-red-300 text-sm p-2.5 rounded-lg">
//         ⚠️ {error}
//       </div>
//     )}

//     <button
//       type="submit"
//       className="bg-blue-600 hover:bg-blue-500 active:scale-95
//                  text-white font-semibold py-2.5 rounded-lg
//                  mt-2 transition-all duration-200
//                  shadow-lg shadow-blue-600/30"
//     >
//       Login
//     </button>

//     {/* Register Redirect */}
//     <p className="text-center text-sm text-gray-400 mt-2">
//       Don't have an account?{" "}
//       <a
//         href="/register"
//         className="text-blue-300 hover:underline font-medium"
//       >
//         Sign up
//       </a>
//     </p>
//   </form>
// </div>


//   );
// }




















import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setToken(res.data.token);
      setRole(res.data.role);

      if (res.data.role === "teacher") navigate("/teacher");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen overflow-hidden flex flex-col justify-center items-center p-6 relative bg-blue-950">

      {/* ── Blobs ── */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* ── Logo ── */}
      <div className="relative z-10 flex items-center gap-2 mb-6">
        <span className="text-3xl">🏫</span>
        <span className="text-white font-bold text-xl tracking-tight">SmartSchool</span>
      </div>

      {/* ── Form Card ── */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 flex flex-col gap-4 w-full max-w-sm
                   bg-white/10 backdrop-blur-md
                   border border-white/20
                   p-8 rounded-2xl shadow-2xl"
      >
        {/* Title */}
        <div className="text-center mb-1">
          <h2 className="text-3xl font-extrabold text-white">Welcome back</h2>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account to continue</p>
        </div>

        {/* ── Email ── */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-300 font-medium">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              ✉️
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5
                         border border-white/20 bg-white/10
                         text-white placeholder-gray-500
                         rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400
                         transition"
              required
            />
          </div>
        </div>

        {/* ── Password ── */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-gray-300 font-medium">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              🔒
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5
                         border border-white/20 bg-white/10
                         text-white placeholder-gray-500
                         rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400
                         transition"
              required
            />
            {/* Show / Hide Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition select-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* Eye-off SVG */
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.168-3.821M6.343 6.343A9.956 9.956 0 0112 5c5 0 9 4 9 7a9.956 9.956 0 01-2.343 3.657M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18" />
                </svg>
              ) : (
                /* Eye SVG */
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-500/20 border border-red-400/40 text-red-300 text-sm p-3 rounded-lg flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 active:scale-95
                     text-white font-semibold py-2.5 rounded-lg
                     mt-1 transition-all duration-200
                     shadow-lg shadow-blue-600/30
                     disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            "Login →"
          )}
        </button>

        {/* ── Divider ── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-xs">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ── Register Link ── */}
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-300 hover:text-blue-200 hover:underline font-medium transition">
            Sign up →
          </Link>
        </p>
      </form>

      <p className="relative z-10 text-gray-600 text-xs mt-6">
        © {new Date().getFullYear()} SmartSchool. All rights reserved.
      </p>

    </div>
  );
}