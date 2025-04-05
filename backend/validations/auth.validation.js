const { body } = require("express-validator");
const handleValidation = require("./validation");

// Regex explanation:
// ^                        : Start of string
// (?=.*\d)                 : Must contain at least one digit
// (?=.*[a-z])              : Must contain at least one lowercase letter
// (?=.*[A-Z])              : Must contain at least one uppercase letter
// (?=.*[!@#$%^&*])         : Must contain at least one special symbol (adjust characters as needed)
// .{6,}                    : Must be at least 6 characters long
// $                        : End of string
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

const validateRegister = [
  body("name").notEmpty().isLength({ min: 3 }),
  body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .matches(passwordRegex)
    .withMessage(
      `Password must be at least 6 characters long\n, include one number\n
      one lowercase letter\n, one uppercase letter\n, and one symbol.`
    ),
  body("country").notEmpty(),
  body("city").notEmpty(),
  body("state").notEmpty(),
  body("gender").notEmpty().isIn(["Male", "Female", "Other"]),
  handleValidation,
];

const validateLogin = [
  body("email").notEmpty().isEmail(),
  body("password")
    .notEmpty()
    .matches(passwordRegex)
    .withMessage(
      `Password must be at least 6 characters long\n, include one number\n
    one lowercase letter\n, one uppercase letter\n, and one symbol.`
    ),
  ,
  handleValidation,
];

module.exports = {
  validateRegister,
  validateLogin,
};
