const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { validationUserId, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validations');

router.get('/', getUsers);

router.get('/:userId', validationUserId, getUserId);
router.get('/me', getCurrentUser);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
