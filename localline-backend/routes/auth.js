const express = require("express");
const { login, logout } = require("../controllers/authController");
const checkToken = require("../middlewares/checkToken");

const router = express.Router();

router.post("/login", login);
router.post("/logout", checkToken, logout);

module.exports = router;