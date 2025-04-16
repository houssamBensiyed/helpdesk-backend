const express = require("express");
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

const router = express.Router();

// All routes require authentication
router.use(authenticateJWT);

// Routes accessible to all authenticated users
router.get("/", getAllTeams);
router.get("/:id", getTeamById);

// Admin only routes
router.post("/", isAdmin, createTeam);
router.put("/:id", isAdmin, updateTeam);
router.delete("/:id", isAdmin, deleteTeam);

module.exports = router;
