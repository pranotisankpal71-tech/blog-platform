const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET = "your_jwt_secret";

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

router.post('/:postId', authMiddleware, async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const comment = new Comment({ content, author: req.userId, post: post._id });
  await comment.save();
  res.json(comment);
});

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
  res.json(comments);
});

module.exports = router;
