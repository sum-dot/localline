
import express from "express";

import {
  getAllBuses,
  getBusList,
  getBusById,
  searchBuses,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/busController.js";

import checkToken from "../middlewares/checkToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/search", searchBuses);
router.get("/list", getBusList);
router.get("/:id", getBusById);

router.get("/", checkToken, isAdmin, getAllBuses);
router.post("/", checkToken, isAdmin, createBus);
router.put("/:id", checkToken, isAdmin, updateBus);
router.delete("/:id", checkToken, isAdmin, deleteBus);

export default router;
