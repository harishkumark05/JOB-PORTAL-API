const User =require('../models/user.model');

const findByEmail = async (email)=>{
    return await User.findOne(email)
}
const createUser =  async (userData)=>{
    return await User.create(userData)
}
const findById =  async (id)=>{
    return await User.findById(id)
}
const updateRefreshToken = async (userId,refreshToken)=>{
    return  await User.findOneAndUpdate({_id:userId},{refreshToken},{new:true})
}
const removeRefreshToken = async (id)=>{
    return await User.findOneAndUpdate({_id:id},{$set:{refreshToken:null}},{new:true});
}
module.exports ={findByEmail,createUser,findById,updateRefreshToken,removeRefreshToken}