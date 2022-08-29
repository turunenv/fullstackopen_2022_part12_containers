import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import { setNotification } from "./notificationSlice";

let initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    //set the blog array with blogs fetched from the server
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      const id = action.payload;
      const idx = state.findIndex((blog) => blog.id === id);
      state.splice(idx, 1);
    },
    likeBlog(state, action) {
      const id = action.payload;
      const blogToLike = state.find(blog => blog.id === id);
      blogToLike.likes = blogToLike.likes + 1;
    }
  },
});

const { setBlogs, addBlog, removeBlog, likeBlog } = blogSlice.actions;

export async function fetchBlogs(dispatch) {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
}

export function createBlog(blog) {
  return async function createBlogThunk(dispatch) {
    const createdBlog = await blogService.create(blog);

    //add the blog to the state array
    dispatch(addBlog(createdBlog));

    //set the success message
    setNotification(dispatch, {
      message: `blog '${createdBlog.title}' by ${createdBlog.author} added!`,
      style: "success",
    });
  };
}

export function deleteBlog(id) {
  return async function deleteBlogThunk(dispatch) {
    try {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id));
    } catch(exception) {
      setNotification(dispatch, { message: "unauthorized", style: "error" })
    }
  };
}

export function addLike(id) {
  return async function likeBlogThunk(dispatch, getState) {
    const blogs = getState().blogs;
    dispatch(setBlogs(blogs))
    const blogToLike = blogs.find(blog => blog.id === id);

    const likedBlog = {
      ...blogToLike,
      user: blogToLike.user.id,
      likes: blogToLike.likes + 1,
    };
    const likedOnServer = await blogService.update(likedBlog.id, likedBlog);
    dispatch(likeBlog(likedOnServer.id));
  }
}

export default blogSlice.reducer;
