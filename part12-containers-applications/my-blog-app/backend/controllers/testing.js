const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingRouter.post("/reset", async (req, res) => {
  //clear the test database before each test
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;
