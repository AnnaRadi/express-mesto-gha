/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable no-useless-escape */
/* eslint-disable eol-last */
/* eslint-disable indent */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  about: {
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    validate: {
      validator: function (v) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(v);
      },
      message: 'Ссылка на аватар не доступна',
    },
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Электронная почта введена неверно',
    },
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Почта или пароль введены неверно'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Почта или пароль введены неверно'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);