const Card = require("../models/card");
const { BadRequestErr, NotFoundErr, ForbiddenErr } = require("../middlewares/customErrors");

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestErr("Переданны некорректные данные"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr("Карточка с указанным _id не найдена");
      }
      if (req.user._id.toString() !== card.owner.toString()) {
        throw new ForbiddenErr("Недостаточно прав для выполнения операции");
      }
      Card.findByIdAndDelete(cardId)
        .then(() => {
          res.send({ message: "Карточка удалена" });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundErr("Передан несуществующий _id");
      } else {
        res.send(updatedCard);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        throw new NotFoundErr("Передан несуществующий _id карточки");
      }
      return res.send(updatedCard);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(err);
      }
      return next(err);
    });
};
