const express = require("express");
const { login, register, profile } = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  validateRegister,
  validateLogin,
} = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", authenticate, profile);

module.exports = router;
