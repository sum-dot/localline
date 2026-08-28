import express from "express";
import { createUser } from "../controllers/usercontroller.js";

const router = express.Router();

router.post("/", createUser);

export default router;