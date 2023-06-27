const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersApi = require("../../../controllers/api/v1/users_api");

router.post("/signup", usersApi.signUp);
router.post("/login", usersApi.signIn);
module.exports = router;
