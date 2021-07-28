const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("listening on port 3000 🎈 http://localhost:3000/");
});
