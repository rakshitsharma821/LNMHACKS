import express from "express";
import { geminiAgent } from ".../ai/geminiAgent.js";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // AI reply
    const aiReply = await geminiAgent(message);

    // Save chat in MongoDB
    const chat = new Chat({ userMessage: message, aiReply });
    await chat.save();

    res.json({ user: message, ai: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
