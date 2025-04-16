const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

// All routes require authentication
router.use(authenticateJWT);

// Admin only routes
router.get("/", isAdmin, getAllUsers);
router.post("/", isAdmin, createUser);
router.delete("/:id", isAdmin, deleteUser);

// User can get their own details, admin can get any
router.get("/:id", getUserById);

// User can update their own details, admin can update any
router.put("/:id", updateUser);

module.exports = router;
