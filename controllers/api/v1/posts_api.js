const jwt = require("jsonwebtoken");
const Post = require("../../../models/post");

module.exports.createPost = async function (req, res) {
  try {
    const { title, content } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const jwt_payload = jwt.decode(token);

    let post = await Post.create({
      title: title,
      content: content,
      authorId: jwt_payload._id,
    });

    return res.status(200).json({
      message: "Post created",
      success: true,
      data: {
        post: post,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

module.exports.readPosts = async function (req, res) {
  try {
    let posts = await Post.find()
      .populate("authorId", ["name"])
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "List of posts",
      success: true,
      data: {
        posts: posts,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

module.exports.readPost = async function (req, res) {
  try {
    const { id } = req.params;

    let post = await Post.findById(id);
    return res.status(200).json({
      message: "Read Post Successfully",
      success: true,
      data: {
        post: post,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

module.exports.updatePost = async function (req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const fields = {};
    if (title) fields["title"] = title;
    if (content) fields["content"] = content;
    let post = await Post.findByIdAndUpdate(id, fields);

    if (!post) {
      res.status(404).json({ msg: "Post not found" });
    }

    return res.status(200).json({
      message: "Update post Successfully!",
      success: true,
      data: {
        post: post,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

module.exports.deletePost = async function (req, res) {
  try {
    const { id } = req.params;
    await Post.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Post deleted Successfully!",
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
