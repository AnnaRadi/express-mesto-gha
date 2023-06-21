/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
module.exports = ForbiddenError;