const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
                      .populate("user", "-blogs");
  return response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  return response.json(blog);
})

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const params = request.body;

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  // check if likes-property was set in the request, default to 0 if not
  if (!params.likes) {
    params.likes = 0;
  }

  // respond with HTTP 400 Bad Request when title and url are missing
  if (!params.title && !params.url) {
    return response.status(400).end();
  }

  const blog = new Blog(params);

  const userFromDb = await User.findById(user.id);
  blog.user = userFromDb._id;

  const savedBlog = await blog.save();

  await blog.populate("user");

  // save the id of the blog to the user
  userFromDb.blogs = userFromDb.blogs.concat(savedBlog._id);
  await userFromDb.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id);
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "missing or invalid token" });
    }

    // did the blog exist in the database?
    if (!blogToDelete) {
      return response.status(404).json({ error: "resource does not exist" });
    }

    // check if user id from token and the id of the user that created the blog are the same
    if (!(user.id === blogToDelete.user.toString())) {
      return response.status(401).json({ error: "unauthorized action" });
    }

    console.log(
      `action authorized, preparing to remove blog ${blogToDelete._id}`
    );
    await Blog.findByIdAndRemove(request.params.id);

    //also remove all comments belonging to this blog
    await Comment.deleteMany({ blog: request.params.id });
    
    response.status(204).end();
  }
);

blogRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", "-blogs");
  response.json(updatedBlog);
});


blogRouter.post("/:id/comments", async (request, response) => {
  const { comment, blog } = request.body;

  //comment minimum 3 characters
  if (comment.length < 3) {
    return response.status(400).json({
      error: "comment should be at least three characters"
    })
  };
  
  const blogComment = new Comment({
    comment,
    blog,
  });
  const addedComment = await blogComment.save();
  response.status(201).json(addedComment);
})

blogRouter.get("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comments = await Comment.find({ blog: id });
  return response.json(comments)
})

module.exports = blogRouter;
