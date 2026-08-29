import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

app.get("/", (req, res) => {
  res.send("LocalLine backend is running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});