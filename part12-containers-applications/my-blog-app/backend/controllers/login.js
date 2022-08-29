const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const loginSuccess =
    user && (await bcrypt.compare(password, user.passwordHash));

  if (!loginSuccess) {
    // login failed (user not existing or wrong password) - return HTTP 401 Unauthorized
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // token to expire in 1 hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
    id: user.id,
  });
});

module.exports = loginRouter;
