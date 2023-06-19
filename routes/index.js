/* eslint-disable eol-last */
/* eslint-disable indent */
const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  res.status(404)
    .send({ message: 'Страница не найдена' });
  next();
});

module.exports = router;