const sequelize = require("../config/database");
const User = require("./user.model");
const Task = require("./task.model");

// Define associations
User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

const db = {
  sequelize,
  User,
  Task,
};

module.exports = db;