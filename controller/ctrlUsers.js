const service = require("../service");
const { userSchema } = require("../helpers/joiSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../service/schemas/user.js");

const logoutUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await service.getUser(email);
  try {
    await User.findByIdAndUpdate(user.id, { token: null });
    return res.status(204).json({
      status: "No Content",
      code: 204,
    });
  } catch {
    console.error(e);
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const results = await service.getAllUsers();
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        users: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUser(email);
  const { error } = userSchema.validate({ email, password });

  if (error === undefined) {
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Incorrect login or password",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user.id, { token });
    res.status(200).json({
      status: "OK",
      code: 200,
      data: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    });
  } else {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: error.details[0].message,
    });
  }
};

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = userSchema.validate({ email, password });
  if (error === undefined) {
    const user = await service.getUser(email);
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    try {
      const newUser = new User({ email });
      newUser.setPassword(password);
      await newUser.save();
      res.status(201).json({
        status: "Created",
        code: 201,
        data: {
          user: {
            email: email,
            subscription: "starter",
          },
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: error.details[0].message,
    });
  }
};

module.exports = { registerUser, getAllUsers, loginUser, logoutUser };
