import {Router} from 'express';
import auth from '../middleware/auth.js';
import { forgotPasswordController, loginUserController, logoutController, refreshTokenController, registerUsercontroller, resetPasswordController, updateUserDetailsController, uploadUserAvtarController, userDetail, verifyEmailController, verifyForgotPasswordOtpController } from '../controller/user.controller.js';
import upload from '../middleware/Multer.js';

const userRouter = Router();



userRouter.post('/register', registerUsercontroller);
userRouter.post("/verify-email",verifyEmailController)
userRouter.post("/login",loginUserController)
userRouter.get("/logout",auth,logoutController)
userRouter.put("/update-avatar",auth,upload.single("avatar"),uploadUserAvtarController)
userRouter.put("/update-user",auth,updateUserDetailsController)
userRouter.put("/forgot-password",forgotPasswordController );
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtpController)
userRouter.put("/reset-password", resetPasswordController); 
userRouter.post("/refresh-token",refreshTokenController)   
userRouter.get("/user-Detail",auth,userDetail)   

export default userRouter;

