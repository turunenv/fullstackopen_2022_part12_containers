import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogSlice";

const BlogForm = ({ toggle }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormStyle = {
    paddingBottom: 10,
  };

  const createNewBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    dispatch(createBlog(newBlog));
    //close the form after user submits
    toggle();
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onSubmit={createNewBlog} style={blogFormStyle}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        <label htmlFor="url">url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
