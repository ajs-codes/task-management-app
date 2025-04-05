const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const errorMiddleware = require("./middlewares/error.middleware");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Handle 404 errors for API routes
app.use((req, res, next) => {
  const error = new Error(`API route not found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);

module.exports = app;
