const express = require('express');
const router = express.Router();
const {register, login,refreshAccessToken,logout} = require('../controllers/auth.controller');
const {inputValidate}= require('../middleware/validation.middleware')
const {registerSchema, loginSchema} = require('../validators/auth.validator');
const { authMiddleware } = require('../middleware/auth.middleware');
router.post('/register', inputValidate(registerSchema) ,register);
router.post('/login', inputValidate(loginSchema), login)
router.post('/refresh-token', refreshAccessToken)
router.post( '/logout',authMiddleware, logout);

module.exports = router