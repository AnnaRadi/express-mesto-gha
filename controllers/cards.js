/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, userId })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Неверные данные' });
      }
      return err;
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404)
        .send({ message: 'Такой карточки нет' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400)
          .send({ message: 'Неверный id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточки не существует' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400)
          .send({ message: 'Неверный id' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404)
          .send({ message: 'Карточки не существует' });
      }
      return res.send(card);
    })
    .then((card) => {
      if (card.userId.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId).then(() => res.send(card));
      }
      return res.status(403)
      .send({ message: 'Возможность удаления своих карточек' });
  })
    .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400)
        .send({ message: 'Неверный id' });
    }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };