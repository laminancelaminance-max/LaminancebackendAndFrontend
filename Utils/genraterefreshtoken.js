import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";


const genraterefreshtoken = async(id) => {
    const token = jwt.sign({id},
    process.env.JWT_SECRET_Refresh_token,
    {expiresIn: '7d'}
)

    const updaterefreshtoken = await UserModel.updateOne(
        {_id: id},
        {refreshToken: token}

    )
    return token;
}
export default genraterefreshtoken;