const {
  HTTP_STATUS_UNAUTHORIZED, // 401
  AUTHORIZED_BUT_FORBIDDEN // 403
} = require("./constantsStatusCode");

class AlienCard extends Error {
  constructor(message) {
    super(message);
    this.name = "Чужая карточка!";
    this.statusCode = AUTHORIZED_BUT_FORBIDDEN;
  }
}

class NeedAuthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Необходима авторизация";
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

class NocorrectlyPswdOrEmail extends Error {
  constructor(message) {
    super(message);
    this.name = "Неправильные почта или пароль";
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = {
  AlienCard,
  NeedAuthorized,
  NocorrectlyPswdOrEmail
};
