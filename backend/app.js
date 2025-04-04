const express = require("express");
const morgan = require("morgan");
const app = express();

const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express Server is running.",
  });
});

app.use(errorMiddleware);

module.exports = app;
