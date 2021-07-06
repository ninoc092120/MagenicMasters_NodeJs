const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/user/:username', 
  userController.validateUserByUsername,
  userController.getUserByUsername);
router.get('/user/email/:emailAddress', 
  userController.validateUserByEmailAddress,
  userController.getUserByEmailAddress);

router.post('/',
  userController.validateEmailAddress,
  userController.validateUsernameEmailAddressExists,
  userController.insertUser
);

router.put('/user/:username', 
  userController.validateUserByUsername,
  userController.validateRequestBodyUsername,
  userController.validateEmailAddress,
  userController.updateUserByUsername);

router.delete('/user/:username', 
  userController.validateUserByUsername,
  userController.deleteUserByUsername);

module.exports = router;