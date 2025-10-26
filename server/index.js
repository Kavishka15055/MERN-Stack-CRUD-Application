const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crud")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// ✅ Get all users
app.get('/', (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// ✅ Get single user by ID
app.get('/getUser/:id', (req, res) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then(user => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch(err => res.status(500).json(err));
});

// ✅ Create new user
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

// ✅ Update user
app.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

// ✅ Delete user
app.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  UserModel.findByIdAndDelete(id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("🚀 Server is running on port 3001");
});
