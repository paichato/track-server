const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user
    .save()
    .then(() => {
      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
      res.send({ token });
    })
    .catch((err) => {
      return res.status(422).send(err.message);
    });
  //   console.log(req.body);
});

router.post('/signin', async (req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    return res.status(422).send({error:'Must provide email and password!'})
  }
  if(!email){
    return res.status(404).send({error:'We dont have an account attached to that email'})
  }
  await User.comparePasswords(password).then(()=>{
    const token=jwt.sign({userId:user._id},'MY_SECRET_KEY');
    res.send({token});
  }).catch((err)=>{
    return res.status(422).send({error:'Invalid password or email'})
  })
})

module.exports = router;
