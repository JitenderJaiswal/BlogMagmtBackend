//npm install -g nodemon express routes mongoose
//npm init(package.json)

const express = require("express");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");

app.use(cors());
//body parser(Middleware)
app.use(express.urlencoded({ extended: false }));

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
