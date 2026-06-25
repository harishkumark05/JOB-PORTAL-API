const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/auth.controller');
const {inputValidate}= require('../middleware/validation.middleware')
const {registerSchema, loginSchema} = require('../validators/auth.validator')
router.post('/register', inputValidate(registerSchema) ,register);
router.post('/login', inputValidate(loginSchema), login)

module.exports = router