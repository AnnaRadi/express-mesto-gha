const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};
const getUserId = (req, res) => {
  const id  = req.params.id;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404)
        .send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400)
        .send({ message: 'не найден пользователь ' });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400)
        .send({ message: 'Неверно' });
        return;
      }
      res.status(500)
      .send({ message: 'Ошибка' });
    });
};
