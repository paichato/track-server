require("./models/user");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const authRouthes = require("./routes/authroutes");
const requireAuth = require("./");

const app = express();

app.use(bodyParser.json()); //to get the body content
app.use(authRouthes);

// const mongoURI =
//   "mongodb+srv://admin:ustro777@cluster0.ahmzk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoose server!🎄");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  console.log(req);
  res.send(`Your email is:${req.user}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000 🎈 http://localhost:3000/");
});
