const authorize =(...roles)=>{
    return (req,res,next)=>{
        console.log(req.user)
        if(!roles.includes(req.user.roles)){
            return res.status(403).json({
                success:false,
                message:'You are not authorized to access this resource'
            })
        }
        next()
    }
}
module.exports ={authorize}