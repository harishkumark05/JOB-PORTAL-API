const express = require('express');
const router = express.Router();
const {getJobs,createJob} = require('../controllers/job.controller');
const { requestTimeMiddleware} = require('../middleware/logger.middleware')
const {authMiddleware} = require('../middleware/auth.middleware')
const {inputValidate}= require('../middleware/validation.middleware')

const {createJobSchema} = require('../validators/auth.validator')

router.get('/',requestTimeMiddleware,authMiddleware , getJobs);
router.post('/',requestTimeMiddleware,authMiddleware , inputValidate(createJobSchema) ,createJob)
module.exports =router;