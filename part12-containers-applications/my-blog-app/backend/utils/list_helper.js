const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, nextBlog) => {
    return total + nextBlog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  // return empty object if blogs is an empty array
  if (blogs.length === 0) {
    return {};
  }
  // sort blogs by likes in descending order
  const sortedBlogs = blogs.sort((blog1, blog2) => {
    return blog1.likes > blog2.likes ? -1 : 1;
  });

  // pick the first one, and return wanted properties
  let favourite = sortedBlogs[0];
  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  // create an object with authors as keys, and number of written blogs as value, using the Lodash library
  const blogCounts = _.countBy(blogs, (blog) => blog.author);

  // find the max number of blogs written by an author
  const maxBlogsNum = Math.max(...Object.values(blogCounts));

  // find the name of that author
  const authorName = Object.keys(blogCounts).find(
    (key) => blogCounts[key] === maxBlogsNum
  );

  // return an object in the correct format
  return {
    author: authorName,
    blogs: maxBlogsNum,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const likeCount = {};

  // get the total likes for each author stored in likeCount
  blogs.forEach((blog) => {
    if (blog.author in likeCount) {
      likeCount[blog.author] += blog.likes;
    } else {
      likeCount[blog.author] = blog.likes;
    }
  });

  const maxLikes = Math.max(...Object.values(likeCount));
  const authorToReturn = Object.keys(likeCount).find(
    (author) => likeCount[author] === maxLikes
  );

  return {
    author: authorToReturn,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
