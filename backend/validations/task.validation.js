const { body, params, query, param } = require("express-validator");
const handleValidation = require("./validation");

const queryTaskValidation = [
  query("page")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 10, max: 100 })
    .withMessage("Limit must be an integer between 10 and 100"),
  query("status")
    .optional()
    .isIn(["", "Pending", "In Progress", "Completed"])
    .withMessage(
      "Status must be one of the following: Pending, In Progress, Completed"
    ),
  query("name").optional().isString().withMessage("Name must be a string"),

  handleValidation,
];

const createOrUpdateTaskValidation = [
  body("name")
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Task name must be at least 2 characters long"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date")
    .custom((startDate) => {
      const now = new Date();
      const start = new Date(startDate);
      now.setHours(0, 0, 0, 0); // ignore time part
      if (start < now) {
        throw new Error("Start date cannot be in the past");
      }
      return true;
    }),
  body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid date")
    .custom((endDate, { req }) => {
      const startDate = req.body.startDate;
      if (new Date(endDate) < new Date(startDate)) {
        throw new Error("End date must be after or equal to start date");
      }
      return true;
    }),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Status must be one of: Pending, In Progress, or Completed"),
  handleValidation,
];

const paramTaskValidation = [
  param("id")
    .notEmpty()
    .withMessage("Task id is required")
    .isUUID()
    .withMessage("Task id must be a valid UUID"),
  handleValidation,
];

module.exports = {
  queryTaskValidation,
  createOrUpdateTaskValidation,
  paramTaskValidation,
};
