import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { co2 } from "@tgwf/co2";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import busRoutes from "./routes/bus.js";

const app = express();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());
app.use(express.json());

// Carbon footprint tracking middleware
const co2Emission = new co2({ model: "swd" });

app.use((req, res, next) => {
    let requestBytes = 0;
    let responseBytes = 0;

    if (req.headers) {
        requestBytes += Buffer.byteLength(JSON.stringify(req.headers), "utf8");
    }
    if (req.query) {
        requestBytes += Buffer.byteLength(JSON.stringify(req.query), "utf8");
    }

    const originalEnd = res.end;

    res.end = function (chunk, ...args) {
        if (chunk) {
            responseBytes += Buffer.byteLength(chunk, "utf8");
        }

        const totalBytes = requestBytes + responseBytes;
        const greenHost = false; // set true only if your host is confirmed green-certified
        const emissions = co2Emission.perByte(totalBytes, greenHost);

        console.log(
            `[CO2] ${req.method} ${req.originalUrl} — ${totalBytes} bytes — ${emissions.toFixed(3)}g CO2eq`
        );

        originalEnd.apply(res, [chunk, ...args]);
    };

    next();
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/buses", busRoutes);

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
