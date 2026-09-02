const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (no extra options needed in new Mongoose)
mongoose.connect('mongodb://localhost:27017/blogPlatform')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
