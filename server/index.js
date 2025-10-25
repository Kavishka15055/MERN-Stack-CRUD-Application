const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
