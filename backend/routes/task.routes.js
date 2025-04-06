const express = require("express");

const {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const {
  queryTaskValidation,
  createOrUpdateTaskValidation,
  paramTaskValidation,
} = require("../validations/task.validation");

const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authenticate, queryTaskValidation, getTasks);
router.get("/:id", authenticate, paramTaskValidation, getTask);
router.post("/", authenticate, createOrUpdateTaskValidation, createTask);
router.put(
  "/:id",
  authenticate,
  paramTaskValidation,
  createOrUpdateTaskValidation,
  updateTask
);
router.delete("/:id", authenticate, paramTaskValidation, deleteTask);

module.exports = router;
