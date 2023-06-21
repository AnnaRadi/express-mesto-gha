/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = AuthError;