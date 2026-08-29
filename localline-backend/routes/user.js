import express from "express";
import { createUser, updateUser } from "../controllers/usercontroller.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/", createUser);
router.put("/me", checkToken, updateUser);

export default router;
