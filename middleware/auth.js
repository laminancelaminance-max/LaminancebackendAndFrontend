
import jwt from 'jsonwebtoken';

const auth = (req,res,next) => {
    try{

        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];
        
        if(!token){
            return res.status(401).json({
                message: 'No token provided',
                error: true,
                success: false
            });
        }

        // verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET_Access_token);

        if(!decoded){
            return res.status(401).json({
                message: 'Invalid token or unauthorised user',
                error: true,
                success: false
            });
        }

        req.userId = decoded.id;
        next();

    } catch(error){
        return res.status(500).json({
        message: 'Auth middleware error',
        error: error.message,
        success: false
    });
    }

}

export default auth;
    