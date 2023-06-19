/* eslint-disable import/newline-after-import */
const router = require('express').Router();

// eslint-disable-next-line object-curly-newline
const { getUsers, getUserId, createUser, updateUser, updateAvatar } = require('../controllers/users');
router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
