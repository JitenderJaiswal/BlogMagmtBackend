const express = require("express");
const router = express.Router();
const passport = require("passport");
const postApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postApi.readPosts);
router.get("/:id", postApi.readPost);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postApi.createPost
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  postApi.updatePost
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  postApi.deletePost
);

module.exports = router;
