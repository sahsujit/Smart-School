// // middleware/authMiddleware.js
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // const authMiddleware = async (req, res, next) => {
// //   let token;
// //   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// //     try {
// //       token = req.headers.authorization.split(" ")[1];
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       req.user = await User.findById(decoded.id).select("-password");
// //       console.log("Backend user from token:", req.user);
// //       next();
// //     } catch (err) {
// //       return res.status(401).json({ message: "Not authorized, token failed" });
// //     }
// //   } else {
// //      console.log("No token provided");
// //     return res.status(401).json({ message: "No token, authorization denied" });
// //   }
// // };





// const authMiddleware = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       console.log("Received token:", token);
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");
//       console.log("Decoded user:", req.user);
//       next();
//     } catch (err) {
//       console.error("Token verification failed:", err.message);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     console.log("No token found in request headers");
//     return res.status(401).json({ message: "No token, authorization denied" });
//   }
// };

// const roleMiddleware = (role) => (req, res, next) => {
//     console.log("User role from token:", req.user.role);

//   if (!req.user || req.user.role !== role) {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   next();
// };

// module.exports = { authMiddleware, roleMiddleware };















const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};

const roleMiddleware = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };
