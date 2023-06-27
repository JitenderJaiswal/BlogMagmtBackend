const mongoose = require("mongoose");
const { MOGOURI } = require("./keys");

mongoose.connect(MOGOURI || "mongodb://127.0.0.1:27017/Blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
