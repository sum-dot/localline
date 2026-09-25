
import express from "express";

import {
  getAllBuses,
  getBusList,
  getBusById,
  searchBuses,
  rateBus,
  createBus,
  updateBus,
  deleteBus,
} from "../controllers/busController.js";

import checkToken from "../middlewares/checkToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/search", searchBuses); // public — returns only matches
router.get("/:id", getBusById); // public — one specific bus
router.get("/", checkToken, isAdmin, getAllBuses); // admin-only — full dump, for the dashboard table
router.post("/:id/rate", checkToken, rateBus); // any logged-in user — not admin-only
router.get("/search", searchBuses);
router.get("/list", getBusList);
router.get("/:id", getBusById);

router.get("/", checkToken, isAdmin, getAllBuses);
router.post("/", checkToken, isAdmin, createBus);
router.put("/:id", checkToken, isAdmin, updateBus);
router.delete("/:id", checkToken, isAdmin, deleteBus);

export default router;

