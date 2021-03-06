const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const userRoles = require('./../statics/userRoles');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

// This middleware applies to all subsequent routes defined after it.
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updateMyPassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
// router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo(userRoles.admin));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
