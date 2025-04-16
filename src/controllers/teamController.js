const { Team, User } = require("../models");

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching teams.",
      error: error.message,
    });
  }
};

// Get team by ID
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching team.",
      error: error.message,
    });
  }
};

// Create team (admin only)
const createTeam = async (req, res) => {
  try {
    const { name, description, userIds } = req.body;

    // Check if team with the same name already exists
    const existingTeam = await Team.findOne({ where: { name } });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team already exists with this name.",
      });
    }

    // Create new team
    const team = await Team.create({
      name,
      description,
    });

    // If userIds provided, add users to team
    if (userIds && userIds.length > 0) {
      const users = await User.findAll({
        where: { id: userIds },
      });

      if (users.length > 0) {
        await team.addUsers(users);
      }
    }

    // Get team with associated users
    const teamWithUsers = await Team.findByPk(team.id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Team created successfully.",
      data: teamWithUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating team.",
      error: error.message,
    });
  }
};

// Update team (admin only)
const updateTeam = async (req, res) => {
  try {
    const teamId = req.params.id;
    const { name, description, userIds } = req.body;

    // Find team
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found.",
      });
    }

    // Update team
    await team.update({
      name: name || team.name,
      description: description || team.description,
    });

    // If userIds provided, update team members
    if (userIds && Array.isArray(userIds)) {
      const users = await User.findAll({
        where: { id: userIds },
      });

      await team.setUsers(users);
    }

    // Get updated team with associated users
    const updatedTeam = await Team.findByPk(team.id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Team updated successfully.",
      data: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating team.",
      error: error.message,
    });
  }
};

// Delete team (admin only)
const deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;

    // Find team
    const team = await Team.findByPk(teamId);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found.",
      });
    }

    // Delete team
    await team.destroy();

    res.status(200).json({
      success: true,
      message: "Team deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting team.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
