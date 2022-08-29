const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "JS is awesome",
    author: "Charles Babbage",
    url: "here.com",
    likes: 10,
  },
  {
    title: "Python is also awesome",
    author: "Ada Lovelace",
    url: "there.fi",
    likes: 1000,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const blogById = async (id) => {
  const blog = await Blog.findOne({ id: id });
  return blog.toJSON();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  blogById,
};
