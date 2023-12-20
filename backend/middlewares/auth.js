const jwt = require("jsonwebtoken");

const conf = require("../config/app");

const { NeedAuthorized } = require("../utils/ErrorClass");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  try {
    if (!authorization) {
      throw new NeedAuthorized("Необходима авторизация");
    }
  } catch (err) {
    return next(err);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(
      token,
      conf.JWT_SECRET
    );
  } catch (err) {
    return next(new NeedAuthorized("Необходима авторизация"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальшe
};
