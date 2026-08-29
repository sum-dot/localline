const express = require("express");
const { register, login, logout, getMe } = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkToken, logout);
router.get("/me", checkToken, getMe);

module.exports = router;