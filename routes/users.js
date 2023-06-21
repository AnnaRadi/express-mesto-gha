/* eslint-disable import/newline-after-import */
const router = require('express').Router();

// eslint-disable-next-line object-curly-newline
const { getUsers, getUserId, createUser, updateUser, updateAvatar, getCurrentUser } = require('../controllers/users');

const { validationUserId, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validations');

router.get('/', getUsers);

router.get('/:userId', validationUserId, getUserId);
router.post('/', createUser);
router.get('/me', getCurrentUser);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
