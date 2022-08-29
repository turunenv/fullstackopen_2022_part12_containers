import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import StyledNavbar from "./styles/Navbar.styled";

import { removeUser } from "../reducers/userSlice";

//navbar gets the user as props to handle conditional rendering
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
  return (
    <StyledNavbar>
      <Link to="/blogs">blogs</Link>
      <Link to="/users">users</Link>
      {user ? (
        <>
          <em>{user.name} logged in</em>
          <button onClick={handleLogout}>logout</button>
        </>
      ) :
        <Link to="/login">login</Link>}
    </StyledNavbar>
  );
};

export default Navbar;
