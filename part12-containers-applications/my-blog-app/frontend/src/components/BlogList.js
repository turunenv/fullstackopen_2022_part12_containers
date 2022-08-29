//import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import StyledBlogList from "./styles/BlogList.styled";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector(state => state.user);

  // sort the blogs by the number of likes in descending order
  const sortedBlogs = [...blogs].sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  );
  //if user is not logged in, only render the blog names as text
  return (
    <StyledBlogList>
      {sortedBlogs.map((blog) => {
        return (
          <li key={blog.id}>
            {user ?
              <Link to={`/blogs/${blog.id}`}>
                <em>{blog.title}</em> by {blog.author}
              </Link> :
              <span>
                <em>{blog.title}</em> by {blog.author}
              </span>
            }
          </li>
        );
      })}
    </StyledBlogList>
  );
};

//proptypes not in use anymore after implementing redux into the project

// BlogList.propTypes = {
//   blogs: PropTypes.array.isRequired,
//   updateBlog: PropTypes.func.isRequired,
//   deleteBlog: PropTypes.func.isRequired,
// };

export default BlogList;
