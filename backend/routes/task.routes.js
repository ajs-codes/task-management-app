const express = require("express");

const {
  createTask,
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
