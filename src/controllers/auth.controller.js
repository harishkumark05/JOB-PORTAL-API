const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res,next)=>{
   try{
 const {name,email,password} = req.body;
    const  existingUser = await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'Email already exist'
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
const user = await User.create({name,email,password:hashedPassword})
    res.status(201).json({
        success:true,
        message:'User registered successsfully',
        user
    })
   }catch(e){
    res.status(500).json({
        success:false,
        message:e.message
    })
   }
}
const login =async (req,res)=>{
   try{
 const {email,password} = req.body;
 console.log(email,password)
    
    const user = await User.findOne({email:email});

    if(!user ){
      return  res.status(401).json({
            success:false,
            message:'Invalid credentials'
        })
    }
    const comparePassword = await bcrypt.compare(password,user.password);
    
    if(!comparePassword ){
      return  res.status(401).json({
            success:false,
            message:'Invalid credentials'
        })
    }
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRES_IN
    }

)
    res.status(200).json({
        success:true,
        message:'login successfull',
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
        token
    })
   }catch(e){
     res.status(500).json({
        success:false,
        message:e.message
    })
   }
}
module.exports ={register,login};