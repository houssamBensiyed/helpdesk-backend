const sequelize = require("../config/database");
const User = require("./User");
const Team = require("./Team");

// Define relationships between models
User.belongsToMany(Team, { through: "UserTeams" });
Team.belongsToMany(User, { through: "UserTeams" });

// Function to initialize database
const initializeDatabase = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  initializeDatabase,
  User,
  Team,
};
