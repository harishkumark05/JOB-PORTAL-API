const express = require('express');
const jobRoute = require('./routes/job.routes')
const authRoute = require('./routes/auth.route')
const app = express();
const dotenv = require('dotenv');
dotenv.config({
    path:`.env.${process.env.NODE_ENV}`
})
const {loggerMiddleware} = require('../src/middleware/logger.middleware')
app.use(express.json());
app.use(loggerMiddleware)

app.get('/',(req,res)=>{
    res.send('home')
})

app.use('/jobs',jobRoute)
app.use('/auth',authRoute)

app.use((req,res)=> {
 res.status(404).json({
    success:false,
    message:'Route Not found'
 })
})




module.exports = app;