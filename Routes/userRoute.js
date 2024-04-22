const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (user) {
    return res.status(401).json({ error: "Username already taken" });
  }

  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };
  console.log(userData);
  try {
    const newuser = new User(userData);
    await newuser.save();
    res.send("User Created Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

// router.post("/login", async (req, res) => {
//   const password = req.body.password;
//   try {
//     const user = await User.findOne({
//       username: req.body.username,
//     });
//     if (!user) {
//       return res.status(401).json({ error: "Invalid Username or Password" });
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Invalid Username or Password" });
//     } else {
//       res.send(user);
//     }
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// });
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);
    const user = await User.findOne({ _id: req.body._id });
    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
