import { useRef } from "react";
import { useSelector } from "react-redux";


import BlogList from "../BlogList";
import BlogForm from "../BlogForm";
import Notification from "../Notification";
import Togglable from "../Togglable";

import MainHeader from "../styles/MainHeader";


const Blogs = () => {
  const blogFormRef = useRef();
  const user = useSelector(state => state.user);

  const toggleFormAfterCreatingBlog = () => {
    blogFormRef.current.toggleVisibility();
  }

  return (
    <div>
      <MainHeader size="5em">Blogs</MainHeader>
      <Notification />

      {/* render blogform only for logged-in users */}
      {user ?
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <h2>Create a new blog</h2>
          <BlogForm toggle={toggleFormAfterCreatingBlog} />
        </Togglable> :
        <h2>Login to create, like and comment on blogs!</h2>
      }
      <BlogList />
    </div>
  );
};

export default Blogs;