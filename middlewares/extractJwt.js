/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (jwt) {
    req.headers.authorization = `Bearer ${jwt}`;
  }
  next();
};