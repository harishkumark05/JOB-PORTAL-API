const User =require('../models/user.model');

const findByEmail =  (email)=>{
    return User.findOne({email})
}
const createUser =  (userData)=>{
    return User.create(userData)
}
const findById =  (id)=>{
    return User.findById(id)
}
module.exports ={findByEmail,createUser,findById}