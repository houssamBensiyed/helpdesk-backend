const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Middleware to verify JWT token
const authenticateJWT = async (req, res, next) => {
  try {
    // Get the token from the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Middleware to check if user has admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
};

// Middleware to check if user is an admin or agent
const isAgentOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "agent")) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied. Agent or admin role required.",
    });
  }
};

module.exports = {
  authenticateJWT,
  isAdmin,
  isAgentOrAdmin,
};
