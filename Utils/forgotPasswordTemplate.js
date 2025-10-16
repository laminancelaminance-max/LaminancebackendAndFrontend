const forgotPasswordTemplate = ({name, otp}) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                max-width: 600px; 
                margin: auto; 
                padding: 0; 
                background: #f9f9f9; 
                border-radius: 8px; 
                overflow: hidden; 
                border: 1px solid #e0e0e0;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f46e5, #3b82f6); 
                  padding: 20px; 
                  text-align: center; 
                  color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 25px; color: #333;">
        <h2 style="margin: 0 0 10px;">Hello ${name},</h2>
        <p style="margin: 0 0 15px; font-size: 15px; line-height: 1.6; color: #555;">
          We received a request to reset your password. Please use the OTP below to proceed:
        </p>

        <!-- OTP Box -->
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; 
                       background: #f3f4f6; 
                       border: 2px dashed #3b82f6; 
                       padding: 15px 30px; 
                       font-size: 22px; 
                       font-weight: bold; 
                       color: #1f2937; 
                       border-radius: 6px;">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; color: #666; line-height: 1.6;">
          If you did not request this, please ignore this email.  
          Your account will remain secure.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 13px; color: #777;">
        <p style="margin: 0;">Thank you, <br> The Support Team</p>
      </div>
    </div>
  `;
};

export default forgotPasswordTemplate;
