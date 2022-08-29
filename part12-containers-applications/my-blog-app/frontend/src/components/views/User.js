import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import userService from "../../services/users";

const User = () => {
  const id = useParams().id;
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const fetchUser = async() => {
      const fetchedUser = await userService.getUserById(id);
      setUser(fetchedUser);
    }

    fetchUser();
  }, [])
  const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{ user.name }</h1>
      <h3>Added blogs:</h3>
      { blogs.length > 0 ?
        <ul>
          {blogs.map(blog => {
            return <li key={blog.id}>{ blog.title }</li>
          })}
        </ul> :
        <div>No blogs added yet.</div>
      }
    </div>
  )
}

export default User;