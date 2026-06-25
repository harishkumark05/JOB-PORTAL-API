const User = require('../models/user.model');
const authService =require('../services/auth.service')

const register = async (req,res,next)=>{
   try{
  const user = await authService.register(req.body);

    res.status(201).json({
        success:true,
        message:'User registered successsfully',
        user
    })
   }catch(e){
    res.status(400).json({
        success:false,
        message:e.message
    })
   }
}
const login =async (req,res)=>{
   try{
    const result = await authService.login(req.body);

    res.status(200).json({
        success:true,
        message:'login successfull',
        ...result
    })
   }catch(e){
     res.status(500).json({
        success:false,
        message:e.message
    })
   }
}
module.exports ={register,login};