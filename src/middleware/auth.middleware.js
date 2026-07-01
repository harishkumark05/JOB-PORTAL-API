const jwt = require('jsonwebtoken');

const authMiddleware =(req,res,next)=>{

    try{
      const authHeaders = req.headers.authorization;
      if(!authHeaders){
        return res.status(401).json({
            success:false,
            message:'Auth token is missing'
        })
      }
      const parts = authHeaders.split(" ");
      if(parts.length !==2 || parts[0] !== "Bearer"){
        return res.status(401).json({
                success: false,
                message: "Invalid authorization format"
            });
      }
       const token = parts[1];
       const decoded = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
       )
       
       req.user = decoded;
       console.log("req.user:", req.user);
//        console.log("req.user:", req.user);
// console.log("job data:", {
//   ...req.body,
//   createdBy: req.user?._id
// });
       next()
    }catch(e){
    return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
}

module.exports = {authMiddleware}
