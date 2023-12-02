const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { signUp, logIn, verifyRole } = require('../controllers/authController.js');
const router = require('express').Router();

router.post('/signup',signUp);
router.post('/login',logIn); 
router.post('/verifyrole',verifyRole);

module.exports = {
    userRouter : router
}