import express from "express";
import {
  createUser,
  updateUser,
  toggleFavorite,
  getFavorites,
} from "../controllers/usercontroller.js";
import checkToken from "../middlewares/checkToken.js";


const router = express.Router();

router.post("/", createUser);
router.put("/me", checkToken, updateUser);
router.post("/me/favorites", checkToken, toggleFavorite);
router.get("/me/favorites", checkToken, getFavorites);

export default router;
