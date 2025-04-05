const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getTasks);
router.post("/", authenticate, createTask);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);

module.exports = router;
