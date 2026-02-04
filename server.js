import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routers/authrouters.js";
import questionRoutes from "./routers/questionrouters.js";
import resultRoutes from "./routers/resultrouters.js";
import blockchainRouter from "./routers/blockchainrouter.js";

// 🔹 env sabse pehle
dotenv.config();

// 🔹 app create
const app = express();

// 🔹 DB connect
connectDB();

// 🔹 middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// 🔹 test route
app.get("/", (req, res) => {
  res.send("MindScoreAI Backend API is running...");
});

// 🔹 routes
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/blockchain", blockchainRouter);

// 🔹 server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
