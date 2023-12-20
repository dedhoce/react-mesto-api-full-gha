const { celebrate, Joi } = require("celebrate");

function validateCardId() {
  return celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24)
    })
  });
}

function validateCreateCard() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(/^[www.]*https{0,1}\:\/\/[\w\b-._~:\/?#[\]@!\$&\'\(\)\*\+,;=]+$/)
    }).unknown(true)
  });
}

function validateUpdateInfo() {
  return celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30)
    }).unknown(true)
  });
}

function validateUpdateAvatar() {
  return celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(new RegExp(/^[www.]*https{0,1}\:\/\/[\w\b-._~:\/?#[\]@!\$&\'\(\)\*\+,;=]+$/))
    })
  });
}

function validateGetUser() {
  return celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required().hex().length(24)
    })
  });
}

module.exports = {
  validateCardId,
  validateCreateCard,
  validateUpdateInfo,
  validateUpdateAvatar,
  validateGetUser
};
