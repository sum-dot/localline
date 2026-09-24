import express from "express";
import {
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/busController.js";
import checkToken from "../middlewares/checkToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/",checkToken, getAllBuses);
router.get("/:id",checkToken, getBusById);
router.post("/", checkToken, isAdmin, createBus);
router.put("/:id", checkToken, isAdmin, updateBus);
router.delete("/:id", checkToken, isAdmin, deleteBus);

export default router;