const router = require("express").Router();

const {
  getAllUsers, getUserById, getOwnUser, updateInfo, updateAvatar
} = require("../controllers/users");

const {
  validateUpdateInfo,
  validateUpdateAvatar,
  validateGetUser
} = require("../utils/requestValidationJoi");

router.get("/", getAllUsers);

router.get("/me", getOwnUser);

router.patch("/me", validateUpdateInfo(), updateInfo);

router.patch("/me/avatar", validateUpdateAvatar(), updateAvatar);

router.get("/:userId", validateGetUser(), getUserById);

module.exports = router;
