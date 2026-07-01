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
        const accessToken =
        jwt.sign(
            {
                _id: user._id,
                email: user.email,
                roles:user.roles
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn:
                    process.env.JWT_ACCESS_EXPIRES_IN
            }
        );

        const refreshToken = jwt.sign(
            {_id: user._id, email: user.email},
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
            }
        );
        await authRepo.updateRefreshToken(user._id, refreshToken);
        return {
            accessToken,
            refreshToken,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                roles:user.roles
            }
        }


}
const refreshAccessToken  = async (refreshToken)=>{

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await authRepo.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
    }
    const accessToken = 
        jwt.sign(
            {
                _id:decoded._id,
                email:user.email,
                roles:user.roles
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn:
                    process.env.JWT_ACCESS_EXPIRES_IN
            }
        );
        console.log('refreshAccessToken:', accessToken);
        return accessToken;
}

const logout = async (userId)=>{
    return await authRepo.removeRefreshToken(userId)
}
module.exports = {login,register,refreshAccessToken,logout}