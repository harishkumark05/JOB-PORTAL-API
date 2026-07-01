const express = require('express');
const router = express.Router();
const {getJobs,createJob,getJobById,updateJob} = require('../controllers/job.controller');
const { requestTimeMiddleware} = require('../middleware/logger.middleware')
const {authMiddleware} = require('../middleware/auth.middleware')
const {inputValidate}= require('../middleware/validation.middleware')

const {createJobSchema} = require('../validators/auth.validator');
const {authorize} = require('../middleware/authorize.middleware')

router.get('/',requestTimeMiddleware,authMiddleware , authorize('admin','recruiter') ,getJobs);
router.get('/:id',requestTimeMiddleware,authMiddleware , getJobById);

router.post('/',requestTimeMiddleware,authMiddleware , inputValidate(createJobSchema) ,createJob)

router.put('/:id',requestTimeMiddleware,authMiddleware , inputValidate(createJobSchema), updateJob)

module.exports =router