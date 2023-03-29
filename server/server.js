require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./db/user.model");
const Hobbies = require("./populate/hobbies");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/users", async (req, res) => {
  if (req.query.username) {
    const users = await UserModel.find({ username: { $regex: req.query.username, $options: "i" },}).sort({ created: "desc" });
    return res.json(users);
  } else {
    const users = await UserModel.find().sort({ created: "desc" });
    return res.json(users);
  }
});

app.get("/api/users/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id).populate('liked').populate('rejected');
  return res.json(user);
});

app.post("/api/users/", async (req, res, next) => {
  const user = req.body;

  try {
    const saved = await UserModel.create(user);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/users/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/users/:id", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const deleted = await user.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

app.get("/api/users/:id/matches", async (req, res) => {
  const user = await UserModel.findById(req.params.id).populate('liked');
  const likedUsers = user.liked;
  const matches = await UserModel.find({
    _id: { $in: likedUsers.map((user) => user._id) },
    liked: user._id,
  });
  return res.json(matches);
});

app.get("/api/hobbies/", async (req, res) => {
  const hobbies = await Hobbies;
  return res.json(hobbies);
});

const main = async () => {
  await mongoose.connect(MONGO_URL, { family: 4 });

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/users route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
