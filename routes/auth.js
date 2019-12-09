const path = require('path');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);
router.post('/signup', authController.postSignUp);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;