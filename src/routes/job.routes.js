const express = require('express');
const router = express.Router();
const {getJobs} = require('../controllers/job.controller');
const { requestTimeMiddleware} = require('../middleware/logger.middleware')
const {authMiddleware} = require('../middleware/auth.middleware')
router.get('/',requestTimeMiddleware,authMiddleware ,getJobs);

module.exports =router;