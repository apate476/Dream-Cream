const express = require("express");
const usersRouter = express.Router();

const {
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  updateUser,
} = require("../db/users");

const jwt = require("jsonwebtoken");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      users,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  res.send(req.user);
});

usersRouter.put("/me", async (req, res, next) => {
  try {
    // Extract the updated user information from the request body
    const updatedInfo = req.body;

    // Ensure the request has a user object (usually set by authentication middleware)
    if (!req.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    // Update the user in the database
    const updatedUser = await updateUser(req.user.id, updatedInfo);

    // Send the updated user information back to the client
    res.send({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Login successful!",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { firstname, lastname, email, password, address, city, state, zip } =
    req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email already exists",
      });
    }

    const user = await createUser({
      firstname,
      lastname,
      email,
      password,
      address,
      city,
      state,
      zip,
    });

    const token = jwt.sign(
      {
        id: user.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
