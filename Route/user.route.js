import {Router} from 'express';
import { auth, adminAuth } from '../middleware/auth.js';
import { 
    forgotPasswordController, 
    loginUserController, 
    logoutController, 
    refreshTokenController, 
    registerUsercontroller, 
    resetPasswordController, 
    updateUserDetailsController, 
    uploadUserAvtarController, 
    userDetail, 
    verifyEmailController, 
    verifyForgotPasswordOtpController,
    getAllUsersController,
    updateUserStatusController,
    updateUserRoleController,
    deleteUserController, // Make sure this is imported
    adminResetPasswordController // Make sure this is imported
} from '../controller/user.controller.js';
import upload from '../middleware/Multer.js';

const userRouter = Router();

// Public routes
userRouter.post('/register', registerUsercontroller);
userRouter.post("/verify-email", verifyEmailController)
userRouter.post("/login", loginUserController)
userRouter.put("/forgot-password", forgotPasswordController );
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtpController)
userRouter.put("/reset-password", resetPasswordController); 
userRouter.post("/refresh-token", refreshTokenController)   

// Protected routes (authenticated users)
userRouter.get("/logout", auth, logoutController)
userRouter.put("/update-avatar", auth, upload.single("avatar"), uploadUserAvtarController)
userRouter.put("/update-user", auth, updateUserDetailsController)
userRouter.get("/user-Detail", auth, userDetail)   

// Admin only routes
userRouter.get("/admin/users", adminAuth, getAllUsersController)
userRouter.put("/admin/users/:userId/status", adminAuth, updateUserStatusController)
userRouter.put("/admin/users/:userId/role", adminAuth, updateUserRoleController)
userRouter.delete("/admin/users/:userId", adminAuth, deleteUserController) // DELETE route
userRouter.post("/admin/users/:userId/reset-password", adminAuth, adminResetPasswordController)

export default userRouter;