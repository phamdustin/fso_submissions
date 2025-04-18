const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { info, error } = require("../utils/logger");
const middleware = require("../utils/middleware");
require("dotenv").config();

blogRouter.get("/", async (request, response) => {
  console.log("grabbing list of blogs from database");
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  console.log("post router");

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "Missing title or url",
    });
  } else {
    const body = request.body;
    const user = request.user;
    console.log(`user is ${user}`);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user,
    });
    console.log(blog);
    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id);
    await user.save();

    response.status(201).json(result);
  }
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    console.log("delete router");

    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(401).json({ error: "Blog cannot be found" });
    }
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
    } else {
      return response
        .status(401)
        .json({ error: "Not the same user who created the blog" });
    }

    response.status(204).end();
  },
);

blogRouter.put("/:id", async (request, response) => {
  info("put router");
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(201).json(updatedBlog);
});

module.exports = blogRouter;
