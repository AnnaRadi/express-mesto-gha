/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const Card = require('../models/card');
const NotFoundError = require('../errs/NotFoundError');
const BadRequestError = require('../errs/BadRequestError');
const ForbiddenError = require('../errs/ForbiddenError');

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
        next(new BadRequestError('Неверные данные'));
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
        throw new NotFoundError('Такой карточки нет');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный id'));
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
        throw new NotFoundError('Карточки не существует');
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный id'));
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
        throw new NotFoundError('Карточки не существует');
      }
      return res.send(card);
    })
    .then((card) => {
      if (card.userId.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId).then(() => res.send(card));
      }
      throw new ForbiddenError('Возможность удаления своих карточек');
  })
    .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный id'));
    }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };