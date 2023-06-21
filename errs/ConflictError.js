/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = ConflictError;