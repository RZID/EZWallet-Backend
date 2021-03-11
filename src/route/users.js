const express = require("express");
const Router = express.Router();

const {
  login,
  register,
  updateUser,
  loginPIN,
  detailUser,
  listUser,
  changePassword,
  activation,
} = require("../controller/users");
const { authentication } = require("../helper/middleware/auth");
const singleUpload = require("../helper/middleware/upload");

Router.get("/api/allUser/:id", authentication, listUser)
  .get("/api/user/:id", authentication, detailUser)
  .get("/api/activate/:token/:email", activation)
  .post("/api/login", login)
  .post("/api/register", register)
  .patch("/api/user/:id", authentication, singleUpload, updateUser)
  .post("/api/loginPIN/:id", authentication, loginPIN)
  .patch("/api/changePassword/:id", authentication, changePassword);

module.exports = Router;
