const router = require("express").Router();
const {
  getAllCards, createCard, deleteCard, likeCard, deleteLikeCard
} = require("../controllers/cards");

const {
  validateCardId,
  validateCreateCard
} = require("../utils/requestValidationJoi");

router.post("/", validateCreateCard(), createCard);
router.get("/", getAllCards);
router.delete("/:cardId", validateCardId(), deleteCard);
router.put("/:cardId/likes", validateCardId(), likeCard);
router.delete("/:cardId/likes", validateCardId(), deleteLikeCard);

module.exports = router;
