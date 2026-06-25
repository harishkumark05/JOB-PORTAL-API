const app = require('./src/app');
const {connectDB} = require('./src/config/db.config')

const PORT = process.env.PORT || 3000;
const startServer =async()=>{
    console.log('connect db call')
       await connectDB()
       app.listen(PORT,()=>{
    console.log(`Server is up on port: ${PORT}`)
})
}
startServer()
