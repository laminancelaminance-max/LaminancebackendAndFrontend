import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import getEmailTemplate from '../Utils/verifyEmailTemplate.js';
import sendEmail from '../config/sendEmail.js';
import genrateAccessToken from '../Utils/genrateAccessToken.js';
import genraterefreshtoken from '../Utils/genraterefreshtoken.js';
// import genrateAccessToken from '../Utils/genrateaccesstoken.js';
// import genraterefreshtoken from '../Utils/genraterefresstoken.js';
import uploadImageToCloudinary from '../Utils/uploadimagecloudinary.js';
import genrateOTP from '../Utils/genrateOTP.js';
import forgotPasswordTemplate from '../Utils/forgotPasswordTemplate.js';
import jwt from 'jsonwebtoken';

export async function registerUsercontroller(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true,
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
                error: true,
                success: false
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prepare payload
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            status: 'active'
        });

        // Save user to DB
        const savedUser = await newUser.save();

        // Prepare verification URL
        const verifyEmailUrl = `${process.env.Frontend_URL}/verify-email?code=${savedUser._id}`;

        // Send verification email
        await sendEmail({
            sendTo: email,
            subject: 'Welcome to Laminance Cabinetry!',
            html: getEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        });

        // Respond
        return res.status(201).json({
            message: 'User registered successfully. Verification email sent!',
            data: savedUser,
            success: true,
        });

    } catch (error) {
        console.error('Register User Error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message,
            success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try{

        const {code} = req.body

        const user = await UserModel.findOne({_id: code});

        if(!user) {
            return res.status(400).json({
                message: 'Invalid verification code',
                error: true,
                success: false
            });
        }

        const updateUser = await UserModel.updateOne(
            {_id: code},
            { verify_email: true }
        );

        return res.status(200).json({
            message: 'Email verified successfully',
            data: updateUser,
            success: true,
            error: false
        });

       

    }
    catch(error){
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message 
            
        });
    }
}

// login controller 

export async function loginUserController(req, res) {

    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({   
                message: 'Email and password are required',
                error: true,
                success: false
            });
        }

        // ID EXIST OR NOT IN DAATABASE

        const user = await UserModel.findOne({ email });



        if(!user) {
            return res.status(400).json({
                message: 'User does not registered',
                error: true,
                success: false
            });
        }

        if(user.status !== 'active') {
            return res.status(403).json({
                message: 'Contact to admin, your account is not active',
                error: true,
                success: false
            });
        }

        // passsword decrypt 

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword) {
            return res.status(400).json({
                message: 'Invalid password',
                error: true,
                success: false
            });
        }  
        
        // acces token and refrence token 

        const accessToken = await genrateAccessToken(user._id);
        const refreshToken = await genraterefreshtoken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        }) 

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(200).json({
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken
            },
            success: true,
            error: false
        });
        
    }
    catch(error){
        return res.status(500).json({
            message: 'User does not registered',
            error: error.message ,
            success: false
        });
    }

}

// logout controller 

export async function logoutController(req, res) {
    try{

        const userId = req.userId;

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        const removerefrshtoken = await UserModel.findByIdAndUpdate(userId, {
            refreshToken: ""
        });


        return res.status(200).json({
            message: 'Logout successful',
            success: true,
            error: false
        });
    }

    catch(error){
        return res.status(500).json({
            message: 'logout  hi hua hai',
            error: error.message 
            
        });
    }   

}

// upload user avtar controller
export async function uploadUserAvtarController(req, res) {

    try{

        const userId = req.userId; // wear 
        const image = req.file; // multer middlewear

        const upload = await uploadImageToCloudinary(image);

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
           avatar: upload.url
        });

        return res.json({
            message: 'Image uploaded successfully',
            success:true,
            error:false,
            data: {
                _id: userId,
                avatar: upload.url
        ,
            }
        });


    }
    catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}

// update user detail 
export async function updateUserDetailsController(req, res) {
    try{
        const userId = req.userId; // auth middlewear

        const {name,email,mobile,password} = req.body;

        let hashedPassword =""

        if(password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const updateuser = await UserModel.updateOne({_id : userId}, {
          ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashedPassword })
        });

        return res.status(200).json({
            message: 'Updated Successfully',
            data: updateuser,
            success: true,
            error: false
        });
    }
    catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}

// forgot password controller

export async function forgotPasswordController(req, res) {
    try{
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Email not registered',
                error: true,
                success: false
            });
        }

        const otp = genrateOTP(); 
        const expiretime = new Date() + 60 * 60 * 1000; // 1 hour from now

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expiretime).toISOString()

        })

        await sendEmail({
            sendTo: email,
            subject: 'Forgot password from Laminance Cabinetry',
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp,
                expiretime: new Date(expiretime).toLocaleString()
            })
        });

        return res.status(200).json({   
            message: 'OTP sent to your email',
            data: {
                otp,
                expiretime
            },
            success: true,
            error: false
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        // Generate a reset token (you can implement your own logic here)
        const resetToken = genrateAccessToken(user._id);

        // Send the reset link via email (you can implement your own logic here)
        const resetLink = `${process.env.Frontent_URL}/reset-password?token=${resetToken}`;

        await sendEmail({
            sendTo: email,
            subject: 'Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });

        return res.status(200).json({
            message: 'Password reset link sent to your email',
            success: true,
            error: false
        });
    }
    catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }

}


// verify forgotpassword otp controller 

export async function verifyForgotPasswordOtpController(req, res) {
    try{

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: 'Email and OTP are required',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Email not registered',
                error: true,
                success: false
            });
        }

        const currentTime = new Date().toISOString();

        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: 'OTP is expired',
                error: true,
                success: false
            });
        }

        // otp match check

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP',
                error: true,
                success: false
            });
        }

        // if otp is not expire and matched

        const updateuser = await UserModel.findByIdAndUpdate(user?._id,{
            forgot_password_otp: "",
            forgot_password_expiry:""
        })

        return res.status(200).json({
            message: 'OTP verified successfully',
            data: {
                _id: user._id,
                email: user.email
            },
            success: true,
            error: false
        });




    }

    catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// reset password controller

export async function resetPasswordController(req, res) {
    try{

        const {email , newPassword , confirmpassword} = req.body;
        if(!email || !newPassword || !confirmpassword) {
            return res.status(400).json({
                message: 'All fields are required',
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: 'Email not registered',
                error: true,
                success: false
            });
        }

        if(newPassword !== confirmpassword) {
            return res.status(400).json({
                message: 'Password and confirm password must be same',
                error: true,
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const uppdate = await UserModel.findByIdAndUpdate(user._id, {
            password: hashedPassword
        });

        return res.status(200).json({
            message: 'Password reset successfully',
            data: uppdate,
            success: true,
            error: false
        });

    }

    catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// refresh token controller 

export async function refreshTokenController(req, res) {
    try{

        const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split(" ")[1];

        if(!refreshToken) {
            return res.status(401).json({
                message: 'Invalid token',
                error: true,
                success: false
            });
        }

     const verifytoken = await jwt.verify(refreshToken, process.env.JWT_SECRET_Refresh_token);

        if(!verifytoken) {
            return res.status(401).json({
                message: 'Invalid token',
                error: true,
                success: false
            });
        }

      
        const userId = verifytoken?._id;

        const newaccessToken = await genrateAccessToken(userId);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };


        res.cookie("accessToken", newaccessToken, cookieOptions)

        return res.status(200).json({
            message: 'New access token generated successfully',
            data: {
                accessToken: newaccessToken
            },
            success: true,
            error: false
        });

    }

    catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// get login user detail 

export async function userDetail(request,response){
    try{
        const userId = request.userId

        const user = await UserModel.findById(userId).select("-password -refreshToken ")

        return response.json({
            message : "user detail",
            data : user,
            error:false,
            success: true
        })
    }catch(error){
        return response.json({
             message : "something is wrong",
            error:true,
            success: false
        })
        
    }
}


