const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String, required:true,unique:true},
        password:{type:String,required:true},
        refreshToken:{type:String,default:null},
        roles:{type:String,enum:['canditate','recruiter','admin'],default:'canditate'}

    },{
        timestamps:true
    }
)

module.exports = mongoose.model('User', userSchema)