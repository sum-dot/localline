const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkToken, logout);

module.exports = router;