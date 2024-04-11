const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation.js");

// new conversation

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation with a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a conversation of two users
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
