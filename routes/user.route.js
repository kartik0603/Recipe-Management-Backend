const express = require("express");

const userRouter = express.Router();



const {
  register,
  login,
  forgetPassword,
  resetPassword,
} = require("../controller/user.controler.js");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password/:token", resetPassword);



module.exports = userRouter;