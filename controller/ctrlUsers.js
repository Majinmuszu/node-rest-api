const service = require("../service");
const { userSchema } = require("../helpers/joiSchema.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const User = require("../service/schemas/user.js");

const currentUser = async (req, res, next) => {
  const { email } = req.user;
  try {
    const user = await service.getUser(email);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "OK",
      data: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await service.getUser(email);
    await User.findByIdAndUpdate(user.id, { token: null });
    return res.status(204).json({
      status: "No Content",
      code: 204,
    });
  } catch (e) {
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
      message: "OK",
      data: {
        users: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateUserSub = async (req, res, next) => {
  const { subscription, email } = req.body;
  const { error } = userSchema.validate({ subscription, email });
  if (error === undefined) {
    try {
      const result = await service.updateUserSubscription(email, subscription);
      if (result) {
        res.status(200).json({
          status: "success",
          code: 200,
          message: "OK",
          data: {
            email,
            subscription,
          },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `user not found`,
          data: "Not Found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 403,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.getUser(email);
  const { error } = userSchema.validate({ email, password });

  if (error === undefined) {
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Incorrect login or password",
        data: "Unauthorized",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user.id, { token });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "OK",
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
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
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
        status: "success",
        code: 201,
        message: "Created",
        data: {
          user: {
            email: email,
            subscription: "starter",
          },
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  currentUser,
  updateUserSub,
};
