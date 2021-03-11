const bcrypt = require("bcrypt");
const {
  mRegister,
  mCheckEmail,
  mUpdateUser,
  mDetailUser,
  mAllUser,
  mTotal,
  createActivationToken,
  getActivation,
  deleteActivation,
  setActiveUser,
} = require("../model/users");
const { success, failed, notFound } = require("../helper/response");
const mailer = require("../helper/mailer");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../helper/env");
const fs = require("fs");

module.exports = {
  login: (req, res) => {
    const body = req.body;
    mCheckEmail(body.email)
      .then(async (response) => {
        if (response.length === 1) {
          const checkPassword = await bcrypt.compare(
            body.password,
            response[0].password
          );

          if (checkPassword && response[0].pin.length != 0) {
            if (response[0].is_active != 1) {
              failed(
                res,
                `Your account isn't activated yet! Check your email!`,
                {}
              );
            } else {
              const dataUser = {
                // data to be encrypted by JWT
                id: response[0].id,
                email: response[0].email,
              };
              const token = jwt.sign(dataUser, JWT_SECRET);

              res.json({
                message: "Login success",
                token, // same property and value
                name: response[0].name,
                id: response[0].id,
                pin: true,
              });
            }
          } else if (checkPassword && response[0].pin.length === 0) {
            if (response[0].is_active != 1) {
              failed(
                res,
                `Your account isn't activated yet! Check your email!`,
                {}
              );
            } else {
              const dataUser = {
                // data to be encrypted by JWT
                id: response[0].id,
                email: response[0].email,
              };
              const token = jwt.sign(dataUser, JWT_SECRET);

              res.json({
                message: "Login success",
                token, // same property and value
                name: response[0].name,
                id: response[0].id,
                pin: false,
              });
            }
          } else {
            failed(res, "Login failed, please check your password", {});
          }
        } else {
          notFound(res, "Email not found", {});
        }
      })
      .catch((err) => {
        if (!body.email || !body.password) {
          failed(res, "Please input all field", err);
        } else {
          failed(res, "Internal server error", err);
        }
      });
  },
  register: async (req, res) => {
    const body = req.body;
    const data = {
      name: body.name,
      email: body.email,
      password: body.password,
      image: "default.png",
      pin: "",
      phone: "+62",
    };
    mCheckEmail(data.email)
      .then(async (response) => {
        if (response.length >= 1) {
          failed(res, "Email has been registered", {});
        } else {
          // use salt to add a unique code in password
          const salt = await bcrypt.genSalt(10); // 10 to make code more unique (optional)
          const password = await bcrypt.hash(body.password, salt);
          const user = {
            name: data.name,
            email: data.email,
            password,
            image: data.image,
            pin: data.pin,
            phone: data.phone,
          };
          const token = jwt.sign(
            { identity: user, timestamp: new Date() },
            JWT_SECRET
          );
          if (!user.name || !user.email || !user.password) {
            failed(res, "All textfield is required!", []);
          } else {
            mRegister(user)
              .then((response) => {
                createActivationToken(token, user.email)
                  .then(() => {
                    // Send Email From Here
                    mailer
                      .register(user.email, user.name, token)
                      .then(() => {
                        success(
                          res,
                          {},
                          {},
                          "Register success, please check your email for verification!"
                        );
                      })
                      .catch((err) => {
                        failed(res, "Mailer Error", err);
                      });
                  })
                  .catch((err) => {
                    failed(res, "Internal server error", err);
                  });
              })
              .catch((err) => {
                failed(res, "Internal server error", err);
              });
          }
        }
      })
      .catch((err) => {
        failed(res, "Internal server error", err);
      });
  },
  updateUser: async (req, res) => {
    try {
      const data = req.body;
      const id = req.params.id;
      const detail = await mDetailUser(id);

      if (data.pin) {
        const salt = await bcrypt.genSalt(10);
        data.pin = await bcrypt.hash(data.pin, salt);
      }
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }
      if (req.file) {
        if (detail[0].image === "default.png") {
          data.image = req.file.filename;
          mUpdateUser(data, id)
            .then((response) => {
              success(res, response, {}, "Update profile success");
            })
            .catch((err) => {
              failed(res, "Internal server error", []);
            });
        } else {
          data.image = req.file.filename;
          const path = `./public/images/${detail[0].image}`;
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
          }
          mUpdateUser(data, id)
            .then((response) => {
              success(res, response, {}, "Update profile success");
            })
            .catch((err) => {
              failed(res, "Internal server error", []);
            });
        }
      } else {
        mUpdateUser(data, id)
          .then((response) => {
            success(res, response, {}, "Update success");
          })
          .catch((err) => {
            failed(res, "Internal server error", []);
          });
      }
    } catch (error) {
      failed(res, "Internal server error", []);
    }
  },
  loginPIN: (req, res) => {
    const body = req.body;
    const id = req.params.id;
    mDetailUser(id)
      .then(async (response) => {
        if (response.length === 1) {
          const checkPIN = await bcrypt.compare(body.pin, response[0].pin);
          if (checkPIN) {
            success(res, {}, {}, "Check pin success");
          } else {
            failed(res, "Check pin failed, please check your PIN number", {});
          }
        }
      })
      .catch((err) => {
        if (!body.pin) {
          failed(res, "Please input all field", err);
        } else {
          failed(res, "Internal server error", err);
        }
      });
  },
  detailUser: (req, res) => {
    const id = req.params.id;
    mDetailUser(id)
      .then((response) => {
        if (response.length > 0) {
          const data = {
            id: response[0].id,
            name: response[0].name,
            email: response[0].email,
            image: response[0].image,
            phone: response[0].phone,
            balance: response[0].balance,
          };
          success(res, data, {}, "Get detail user");
        } else {
          notFound(res, "Id user not found", {});
        }
      })
      .catch((err) => {
        failed(res, "Internal server error", err);
      });
  },
  listUser: async (req, res) => {
    try {
      const id = req.params.id;
      const searchParams = req.query.searchParams
        ? req.query.searchParams
        : "name";
      const search = req.query.search ? req.query.search : "";
      const param = req.query.param ? req.query.param : "name";
      const sort = req.query.sort ? req.query.sort : "ASC";
      const limit = req.query.limit ? req.query.limit : 6;
      const page = req.query.page ? req.query.page : 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const responseTotal = await mTotal(id, searchParams, search); // count total page

      mAllUser(id, searchParams, search, param, sort, offset, limit)
        .then((response) => {
          const data = response.filter((el) => el.id != 1);
          const pagination = {
            page: page,
            limit: limit,
            totalData: responseTotal[0].total,
            totalPage: Math.ceil(responseTotal[0].total / limit),
          };
          if (response.length > 0) {
            success(res, data, pagination, "Get all users success");
          } else {
            notFound(res, "Data unavailable", data);
          }
        })
        .catch((err) => {
          failed(res, "Internal server error", err);
        });
    } catch (error) {
      failed(res, "Internal server error", []);
    }
  },
  changePassword: (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;

      mDetailUser(id)
        .then(async (response) => {
          const checkPassword = await bcrypt.compare(
            body.oldpassword,
            response[0].password
          );
          if (checkPassword) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(body.password, salt);
            const data = {
              password,
            };
            mUpdateUser(data, id)
              .then((response) => {
                success(res, {}, {}, "Success change password");
              })
              .catch((err) => {
                failed(res, "Internal server error", {});
              });
          } else {
            failed(res, "Your old password are wrong", {});
          }
        })
        .catch((err) => {
          if (!body.oldpassword || !body.password) {
            failed(res, "Please input your password", err);
          } else {
            failed(res, "Internal server error", err);
          }
        });
    } catch (err) {
      failed(res, "Internal server error", err);
    }
  },
  activation: (req, res) => {
    if (!req.params.token || !req.params.email) {
      failed(res, "Fill all requested field for activation!", "");
    } else {
      getActivation(req.params.token, req.params.email)
        .then((response) => {
          setActiveUser(req.params.email)
            .then(() => {
              deleteActivation(response[0].id)
                .then(() => {
                  success(res, {}, {}, "Activated");
                })
                .catch((err) => {
                  failed(res, "Internal Server Error", err);
                });
            })
            .catch((err) => {
              failed(res, "Internal Server Error", err);
            });
        })
        .catch((err) => {
          failed(res, "Internal Server Error", err);
        });
    }
  },
};
