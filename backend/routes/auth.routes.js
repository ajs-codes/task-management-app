const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
