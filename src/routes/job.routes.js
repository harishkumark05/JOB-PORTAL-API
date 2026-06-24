const express = require('express');
const router = express.Router();
const {getJobs} = require('../controllers/job.controller');
const { requestTimeMiddleware} = require('../middleware/logger.middleware')
router.get('/',requestTimeMiddleware, getJobs);

module.exports =router;