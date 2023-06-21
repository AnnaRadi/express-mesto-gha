/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable import/extensions */
/* eslint-disable eol-last */
// eslint-disable-next-line import/no-unresolved
const NotFoundError = require('./NotFoundError');

module.exports = (req, res, next) => {
  const err = new NotFoundError('Ресурс не обнаружен');
  next(err);
};