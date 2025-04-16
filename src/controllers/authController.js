const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Register a new user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // Create new user (password will be hashed automatically via hooks)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      // Only admins can create other admins
      role: req.user && req.user.role === "admin" ? role : "client",
    });

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user.",
      error: error.message,
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Validate password
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    // Remove password from response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during login.",
      error: error.message,
    });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to request from auth middleware
    const userResponse = { ...req.user.toJSON() };
    delete userResponse.password;

    res.status(200).json({
      success: true,
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user details.",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
