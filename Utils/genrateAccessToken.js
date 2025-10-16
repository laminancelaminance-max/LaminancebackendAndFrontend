import jwt from "jsonwebtoken";

const genrateAccessToken = async(userId)=>{

    const token = await jwt.sign({id: userId}, 
    process.env.JWT_SECRET_Access_token,
     {expiresIn: '1d'}
    )
    return token;
}

export default genrateAccessToken;