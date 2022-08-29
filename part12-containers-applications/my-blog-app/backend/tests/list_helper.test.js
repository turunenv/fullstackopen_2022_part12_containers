const listHelper = require("../utils/list_helper");
const testCases = require("../utils/testCases");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(testCases.listWithOneBlog);
    expect(result).toBe(10);
  });

  test("when list is empty, equals zero", () => {
    const result = listHelper.totalLikes(testCases.emptyList);
    expect(result).toBe(0);
  });

  test("when multiple blogs, equals the total sum of likes", () => {
    const result = listHelper.totalLikes(testCases.listWithMultipleBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has only one blog, that blog is returned in the correct format", () => {
    const result = listHelper.favoriteBlog(testCases.listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 10,
    });
  });

  test("when list is empty, an empty object is returned", () => {
    const result = listHelper.favoriteBlog(testCases.emptyList);
    expect(result).toEqual({});
  });

  test("when list has multiple blogs, the correct one is returned in the correct format", () => {
    const result = listHelper.favoriteBlog(testCases.listWithMultipleBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("author with the most blogs written", () => {
  test("when list has only one blog, that author is returned in the correct format", () => {
    const result = listHelper.mostBlogs(testCases.listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("when list is empty, an empty object is returned", () => {
    const result = listHelper.mostBlogs(testCases.emptyList);
    expect(result).toEqual({});
  });

  test("when list has multiple blogs, the correct author is returned with the number of blogs written", () => {
    const result = listHelper.mostBlogs(testCases.listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("when multiple authors have same amount of blogs written (being the top writers), only one is returned", () => {
    const result = listHelper.mostBlogs(testCases.listWithManyTopBloggers);
    expect(result).toEqual(
      expect.objectContaining({
        author: expect.any(String),
        blogs: expect.any(Number),
      })
    );
  });
});

describe("author with the most likes", () => {
  test("when list has only one blog, that author is returned in the correct format", () => {
    const result = listHelper.mostLikes(testCases.listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 10,
    });
  });

  test("when list is empty, an empty object is returned", () => {
    const result = listHelper.mostLikes(testCases.emptyList);
    expect(result).toEqual({});
  });

  test("when list has multiple blogs, the correct author is returned with the number of blogs written", () => {
    const result = listHelper.mostLikes(testCases.listWithMultipleBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });

  test("when multiple authors have same amount of likes, only one is returned", () => {
    const result = listHelper.mostLikes(testCases.listWithManySameLikes);
    expect(result).toEqual(
      expect.objectContaining({
        author: expect.any(String),
        likes: expect.any(Number),
      })
    );
  });
});
