const express = require("express");
const router = express.Router();
const Message = require("../models/Message.js");

// add message

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
