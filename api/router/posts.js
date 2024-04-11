const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const User = require("../models/User");

// create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.json("the post has been updated");
    } else {
      res.status(403).json("you can only update your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.json("the post has been deleted");
    } else {
      res.status(403).json("you can only delete your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// like/unlike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.json("the post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.json("the post has been unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const posts = await Post.find();
    const userPosts = await Post.find({ userId: currentUser._id });
    const timelinePosts = [...userPosts];
    const followings = currentUser.following;
    for (let i = 0; i < followings.length; i++) {
      posts.map((p) => {
        if (p.userId === followings[i]) timelinePosts.push(p);
      });
    }
    const sortedTimelinePosts = timelinePosts.sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
    res.json(sortedTimelinePosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user's all posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    const sortedPosts = posts.sort((a, b) => b.updatedAt - a.updatedAt);
    res.json(sortedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
