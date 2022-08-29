import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../LoginForm";

import loginService from "../../services/login";
import blogService from "../../services/blogs";
import { setNotification } from "../../reducers/notificationSlice";
import { storeUser } from "../../reducers/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(storeUser(user));
      setPassword("");
      setUsername("");

      navigate("/blogs", { replace: true });
    } catch (exception) {
      setNotification(dispatch, { message: "wrong username or password", style: "error" });
      console.log(exception);
    }
  };

  return (
    <LoginForm
      password={password}
      username={username}
      setPassword={setPassword}
      setUsername={setUsername}
      handleLogin={handleLogin}
    />
  )
}

export default Login;