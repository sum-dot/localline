import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const run = async () => {
  await mongoose.connect(process.env.DB_URL);

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (existing) {
    if (existing.role === "admin") {
      console.log("Admin already exists with admin role, skipping.");
    } else {
      existing.role = "admin";
      await existing.save();
      console.log("Existing user promoted to admin.");
    }
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await User.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin account created.");
  await mongoose.disconnect();
};

run();
