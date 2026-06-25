const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
          await mongoose.connect('mongodb://127.0.0.1:27017/job_portal_db');
          console.log('connected to mongoDB database')
    }catch(e){
        console.log('error')
        console.error(e.message);
        process.exit(1)
    }
}

module.exports = {connectDB}