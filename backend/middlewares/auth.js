require('dotenv').config()
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const { NeedAuthorized } = require('../utils/ErrorClass')

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  try  {
    if (!authorization) {
      throw new NeedAuthorized('Необходима авторизация')
    }
  } catch (err) {
    return next(err)
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(err)
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальшe
};
