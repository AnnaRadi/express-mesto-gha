/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable eol-last */
/* eslint-disable indent */
const mongoose = require('mongoose');

const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    required: true,
    type: String,
  },
  link: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
  },
  likes: {
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);