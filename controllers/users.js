/* eslint-disable object-curly-spacing */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-multi-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable eol-last */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable function-paren-newline */
/* eslint-disable semi */
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errs/NotFoundError');
const BadRequestError = require('../errs/BadRequestError');
const ConflictError = require('../errs/ConflictError');
const { formatUser } = require('../utils/formatUser');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(500).send({ message: error }));
};

const getUserId = (req, res, next) => {
  const id  = req.params.id;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(formatUser(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не найден пользователь'));
      }
      res.status(500).send({ message: 'Ошибка на сервере' });
    });
}

const createUser = (req, res, next) => {
  const {name, about, avatar, email,  password} = req.body;

  User.findOne({ email })
    .then((user) => {
      throw new ConflictError('Пользователь уже создан');
    })
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((us) => {
      res.send(formatUser(us));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверно'));
      }
      res.status(500)
      .send({ message: 'Ошибка' });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(formatUser(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'));
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    })
    .catch(next);
}

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(formatUser(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверные данные'));
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};
const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(formatUser(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'Успешная авторизация' });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUsers, getUserId, createUser, updateUser, updateAvatar, getCurrentUser, login}