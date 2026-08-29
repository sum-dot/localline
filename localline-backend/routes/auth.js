const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkToken, logout);

router.get("/me", checkToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;