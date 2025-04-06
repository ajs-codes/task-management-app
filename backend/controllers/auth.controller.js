const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { name, email, password, country, city, state, gender } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      country,
      city,
      state,
      gender,
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "User registration failed",
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.validPassword(password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const { name, email: userEmail } = user;
    res
      .status(200)
      .json({ success: true, token, user: { name, email: userEmail } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, error: err });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { name, email } = user;
    res.status(200).json({ success: true, user: { name, email } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message, error: err });
  }
};
