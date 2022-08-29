import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, addLike } from "../../reducers/blogSlice";

import blogService from "../../services/blogs";

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  //after hours of struggle with mongoose populate-method, we just created a separate api-endpoint
  //to fetch the comments rather than store them in the redux store with the blogs-state
  const [comments, setComments] = useState([]);

  const id = useParams().id;

  useEffect(() => {
    console.log("effect fired")
    const fetchComments = async (id) => {
      const fetchedComments = await blogService.getComments(id);
      setComments(fetchedComments);
    };

    fetchComments(id);
    console.log(comments)
  }, []);

  const removeBlog = () => {
    if (
      window.confirm(
        `are you sure you want to remove '${blog.title}' by ${blog.author}?`
      )
    ) {
      dispatch(deleteBlog(id));
      navigate("/blogs");
    }
  };

  //check if current logged-in user is the creator of the blog
  //if true - render the delete-button
  const user = useSelector((state) => state.user);
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  if (!user || !blog) {
    return null;
  }

  //render delete-button conditionally - only view for the blog creator
  const userIsTheBlogCreator = user.id === blog.user.id;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;

    const addedComment = await blogService.addComment(id, comment);
    setComments([...comments, addedComment]);
    setComment("");
  };

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(addLike(blog.id))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {userIsTheBlogCreator && <button onClick={removeBlog}>Delete</button>}

      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={comment}
          name="comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
