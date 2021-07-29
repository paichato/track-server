const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user
    .save()
    .then(() => {
      res.send("You made a post request");
    })
    .catch((err) => {
      return res.status(422).send(err.message);
    });
  //   console.log(req.body);
});

module.exports = router;
