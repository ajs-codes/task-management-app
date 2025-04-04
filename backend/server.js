const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync();
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on the port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
