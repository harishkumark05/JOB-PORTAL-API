const loggerMiddleware =(req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next();
}
const requestTimeMiddleware = (req,res,next)=>{
    req.reqTime = new Date().toISOString();
    next()
}
module.exports = {loggerMiddleware,requestTimeMiddleware}