const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = new mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
