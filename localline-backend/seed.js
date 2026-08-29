import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import Bus from "./models/Bus.js";

const buses = JSON.parse(
  fs.readFileSync("./data/buses-seed-data.json", "utf-8"),
);

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Bus.deleteMany({});
    await Bus.insertMany(buses);
    console.log(`Inserted ${buses.length} buses`);
    mongoose.disconnect();
  })
  .catch((err) => console.error("Seed error:", err));
