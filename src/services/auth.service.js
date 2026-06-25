const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepo = require('../repositories/user.repository');

const register = async ({name, email, password})=>{
      const  existingUser = await authRepo.findByEmail({email:email});
      if(existingUser){
        throw new Error('User already exist')
      }
      const hashedPassword = await bcrypt.hash(password,10);
      const user = await authRepo.createUser({
        name,
        email,
        password:hashedPassword
      })
      return {
        _id:user._id,
        name:user.name,
        email:user.email
      }
}

const login = async ({email,password})=>{
    const user = await authRepo.findByEmail({email:email});
    if(!user){
        throw new Error('Invalid UserName')
    }
        const matched =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!matched) {
        throw new Error("Invalid password");
    }
        const token =
        jwt.sign(
            {
                _id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN
            }
        );
        return {
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email
            }
        }


}

module.exports = {login,register}