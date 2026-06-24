const users = [];
const register = (req,res,next)=>{
    const {name,email,password} = req.body;
    const  existingUser = users.find(
        user => user.email === email
    )
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:'Email already exist'
        })
    }
    const newUser= {
        id: users.length + 1,
        name,
        email,
        password 
    }
    users.push(newUser)
    res.status(201).json({
        success:true,
        message:'User registered successsfully',
        user:newUser
    })
}
const login =(req,res)=>{
    const {email,password} = req.body;
    const user = users.find(
        user =>
            user.email ===email &&
            user.password === password
    )
    if(!user){
        res.status(401).json({
            success:false,
            message:'Invalid credentials'
        })
    }
    res.status(200).json({
        success:true,
        message:'login successfull',
        user
    })
}
module.exports ={register,login};