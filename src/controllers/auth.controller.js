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
const refreshAccessToken = async (req, res) => {
    try{
          const {refreshToken} = req.body;
          if(!refreshToken){
            return res.status(400).json({
                success:false,
                message:'Refresh token is missing'
            })
          }
          console.log('refreshToken-controller')
          const accessToken = await authService.refreshAccessToken(refreshToken);
          res.status(200).json({
            success:true,
            accessToken
          })
    }catch(e){
     res.status(401).json({

            success: false,

            message: "Invalid or Expired Refresh Token"

        });
    }
}
const logout = async (req,res)=>{
  try{
      await authService.logout(req.user._id);
      res.status(200).json({
        status:true,
        message:'logout successfull'
      })
  }catch(e){
    res.status(500).json({
        success:false,
        message:e.message
    })
}
}
module.exports ={register,login,refreshAccessToken, logout}