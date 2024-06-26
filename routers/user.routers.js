// const { user } = require("../models");
// const { checkExist } = require("../middlewares/validations/checkExist");

const express = require("express");
const {
  register,
  login,
  getAllUser,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/register", register);
// userRouter.get("/", getAllUser);
// userRouter.get("/:id", getDetailUser);
// userRouter.put("/:id", checkExist(user), updateUser);
// userRouter.delete("/:id", checkExist(user), deleteUser);
userRouter.post("/login", login);
userRouter.get("/getAllUser", getAllUser);
userRouter.get("/getDetailUser/:id", getDetailUser);
userRouter.get("/manageUsers", displayUser);
userRouter.put("/editUser/:id", editUser);
userRouter.delete("/deleteUser/:id", deleteUser);

module.exports = {
  userRouter,
  getAllUser,
  displayUser,
  editUser,
  deleteUser,
  getDetailUser,
};
