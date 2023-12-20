const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const conf = require("../config/app");

const {
  HTTP_STATUS_OK, // 200
  HTTP_STATUS_CREATED // 201
} = require("../utils/constantsStatusCode");

function getUser(req, res, next) {
  return userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(next);
}

function getUserDecorator(func) {
  return function (req, res, next) {
    if (req.url === "/me") {
      req.params.userId = req.user._id;
      return func(req, res, next);
    }
    return func(req, res, next);
  };
}

const getUserById = getUserDecorator(getUser);
const getOwnUser = getUserDecorator(getUser);

function getAllUsers(req, res, next) {
  return userModel
    .find()
    .then((users) => {
      return res.status(HTTP_STATUS_OK).send(users);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email, password, name, about, avatar
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => {
      userModel
        .create({
          email,
          password: hash,
          name,
          about,
          avatar
        })
        .then(({
          _id,
          email,
          name,
          about,
          avatar
        }) => {
          return res.status(HTTP_STATUS_CREATED).send({
            _id,
            email,
            name,
            about,
            avatar
          });
        })
        .catch(next);
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        conf.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // вернём токен
      res.status(HTTP_STATUS_OK)
        .send({ token: token })
        .end();
    })
    .catch(next);
}

function updateUserData(req, res, next) {
  const userId = req.user._id;

  return userModel
    .findByIdAndUpdate(userId, req.body, {
      runValidators: true,
      returnDocument: "after"
    })
    .orFail()
    .then((user) => {
      return res.status(HTTP_STATUS_OK).send(user);
    })
    .catch(next);
}

function updatingInfoDecorator(func) {
  return function (req, res) {
    return func(req, res);
  };
}

const updateInfo = updatingInfoDecorator(updateUserData);
const updateAvatar = updatingInfoDecorator(updateUserData);

module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  getOwnUser,
  updateInfo,
  updateAvatar
};
