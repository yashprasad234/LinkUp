const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can only update your account!");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json("Account has been deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can only update your account!");
  }
});

// get a user
router.get("/", async (req, res) => {
  const { userId, username } = req.query;
  // console.log(userId, username);
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    console.log(user);
    const { password, updatedAt, ...other } = user._doc;
    res.json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friendIds = user.following;
    const users = await User.find({});
    const friends = [];
    users.map((u) => {
      if (friendIds.includes(u._id)) {
        friends.push({
          userId: u._id,
          username: u.username,
          profilePicture: u.profilePicture,
        });
      }
    });
    res.json(friends);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!userToFollow.followers.includes(req.body.userId)) {
        try {
          await currentUser.updateOne({ $push: { following: req.params.id } });
          await userToFollow.updateOne({
            $push: { followers: req.body.userId },
          });
          res.json("user has been followed");
        } catch (err) {
          res.status(404).json("unable to follow this user");
        }
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow/unfollow yourself");
  }
});

// unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    console.log(req.params.id);
    console.log(req.body.userId);
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (userToUnfollow.followers.includes(req.body.userId)) {
        try {
          await currentUser.updateOne({ $pull: { following: req.params.id } });
          await userToUnfollow.updateOne({
            $pull: { followers: req.body.userId },
          });
          res.json("user has been unfollowed");
        } catch (err) {
          res.status(404).json("unable to unfollow this user");
        }
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow/unfollow yourself");
  }
});

module.exports = router;
