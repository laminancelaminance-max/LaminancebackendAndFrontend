const getEmailTemplate = ({ name, email, password, loginUrl }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>Welcome to Laminance Cabinetry</title>
    <style>
      /* Reset styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      }
      
      body {
        background: #f8fafc;
        margin: 0;
        padding: 10px;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      /* Main container */
      .container {
        max-width: 560px;
        width: 100%;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
      }
      
      /* Header styles */
      .header {
        background: #1e3a8a;
        padding: 30px 20px;
        text-align: center;
      }
      
      .logo {
        max-width: 140px;
        width: 100%;
        height: auto;
        margin: 0 auto 15px;
        display: block;
        background: white;
        padding: 10px 15px;
        border-radius: 8px;
      }
      
      .header h1 {
        color: white;
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 8px;
        line-height: 1.3;
      }
      
      .header p {
        color: rgba(255, 255, 255, 0.9);
        font-size: 15px;
        margin: 0;
      }
      
      /* Content area */
      .content {
        padding: 30px 25px;
      }
      
      /* Greeting */
      .greeting {
        font-size: 18px;
        color: #1e293b;
        margin-bottom: 20px;
        font-weight: 500;
      }
      
      .greeting strong {
        color: #1e3a8a;
        font-weight: 700;
      }
      
      /* Welcome section with fixed tick */
      .welcome-section {
        background: #f0f9ff;
        padding: 25px 20px;
        border-radius: 12px;
        border-left: 4px solid #3b82f6;
        margin-bottom: 25px;
        text-align: center;
      }
      
      .success-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
      }
      
      .success-icon {
        width: 52px;
        height: 52px;
        background: #10b981;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: white;
        font-weight: bold;
        line-height: 1;
      }
      
      .welcome-section h2 {
        color: #1e3a8a;
        font-size: 18px;
        margin: 0 0 8px;
        font-weight: 700;
        line-height: 1.4;
      }
      
      .welcome-section p {
        color: #475569;
        font-size: 14px;
        margin: 0;
        line-height: 1.5;
      }
      
      /* Credentials card - fixed overflow issue */
      .credentials-card {
        background: #ffffff;
        padding: 20px;
        border-radius: 12px;
        border: 2px solid #e2e8f0;
        margin: 25px 0;
        overflow: hidden;
      }
      
      .credentials-title {
        font-size: 18px;
        font-weight: 700;
        color: #1e3a8a;
        margin-bottom: 18px;
        text-align: center;
      }
      
      .detail-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 14px;
        background: #f8fafc;
        border-radius: 10px;
        margin-bottom: 12px;
        word-break: break-word;
        overflow-wrap: break-word;
      }
      
      .detail-item:last-child {
        margin-bottom: 0;
      }
      
      .detail-icon {
        width: 24px;
        text-align: center;
        font-size: 18px;
        flex-shrink: 0;
      }
      
      .detail-content {
        flex: 1;
        min-width: 0; /* Prevents flex item from overflowing */
      }
      
      .detail-label {
        font-size: 11px;
        color: #64748b;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        margin-bottom: 4px;
      }
      
      .detail-value {
        font-size: 15px;
        font-weight: 600;
        color: #1e293b;
        word-break: break-all;
        overflow-wrap: break-word;
        line-height: 1.4;
      }
      
      /* Login section */
      .login-section {
        text-align: center;
        margin: 25px 0;
      }
      
      .login-section p {
        color: #64748b;
        font-size: 14px;
        margin-bottom: 15px;
      }
      
      .login-button {
        display: inline-block;
        background: #3b82f6;
        color: white !important;
        text-decoration: none;
        padding: 14px 30px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
        border: none;
        cursor: pointer;
        transition: background 0.2s ease;
        width: auto;
        max-width: 100%;
      }
      
      .login-button:hover {
        background: #1d4ed8;
      }
      
      /* Closing message */
      .closing-message {
        text-align: center;
        margin-top: 25px;
        padding: 20px 15px;
        background: #f8fafc;
        border-radius: 10px;
      }
      
      .closing-message p {
        color: #475569;
        font-size: 14px;
        margin: 0;
        line-height: 1.5;
      }
      
      /* Footer */
      .footer {
        background: #1e293b;
        color: white;
        padding: 25px 20px;
        text-align: center;
      }
      
      .footer-logo {
        max-width: 110px;
        width: 100%;
        height: auto;
        margin: 0 auto 20px;
        display: block;
        background: white;
        padding: 8px 12px;
        border-radius: 6px;
      }
      
      .contact-info {
        margin: 15px 0;
        font-size: 13px;
        line-height: 1.8;
      }
      
      .contact-info p {
        margin: 5px 0;
        opacity: 0.9;
      }
      
      .contact-info strong {
        font-weight: 600;
      }
      
      .copyright {
        font-size: 11px;
        opacity: 0.6;
        margin-top: 20px;
        line-height: 1.6;
      }
      
      .copyright p {
        margin: 3px 0;
      }
      
      /* Responsive styles for mobile */
      @media screen and (max-width: 480px) {
        body {
          padding: 5px;
        }
        
        .container {
          border-radius: 12px;
        }
        
        .header {
          padding: 25px 15px;
        }
        
        .header h1 {
          font-size: 22px;
        }
        
        .header p {
          font-size: 14px;
        }
        
        .logo {
          max-width: 120px;
          padding: 8px 12px;
        }
        
        .content {
          padding: 20px 15px;
        }
        
        .greeting {
          font-size: 16px;
          margin-bottom: 15px;
        }
        
        .welcome-section {
          padding: 20px 15px;
        }
        
        .success-icon {
          width: 48px;
          height: 48px;
          font-size: 24px;
        }
        
        .welcome-section h2 {
          font-size: 17px;
        }
        
        .credentials-card {
          padding: 15px;
          margin: 20px 0;
        }
        
        .credentials-title {
          font-size: 17px;
          margin-bottom: 15px;
        }
        
        .detail-item {
          padding: 12px;
          gap: 10px;
        }
        
        .detail-icon {
          width: 20px;
          font-size: 16px;
        }
        
        .detail-label {
          font-size: 10px;
        }
        
        .detail-value {
          font-size: 14px;
        }
        
        .login-button {
          padding: 14px 20px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .closing-message {
          padding: 15px;
          margin-top: 20px;
        }
        
        .footer {
          padding: 20px 15px;
        }
        
        .footer-logo {
          max-width: 100px;
        }
        
        .contact-info {
          font-size: 12px;
        }
      }
      
      /* Very small screens */
      @media screen and (max-width: 320px) {
        .header h1 {
          font-size: 20px;
        }
        
        .detail-item {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .detail-icon {
          margin-bottom: 5px;
        }
      }
      
      /* Outlook and email client fixes */
      .ExternalClass, .ReadMsgBody {
        width: 100%;
        background-color: #f8fafc;
      }
      
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
        line-height: 100%;
      }
    </style>
  </head>
  <body style="background: #f8fafc; margin: 0; padding: 10px;">
    <div class="container" style="max-width: 560px; width: 100%; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);">
      <!-- Header Section -->
      <div class="header" style="background: #1e3a8a; padding: 30px 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance Cabinetry" class="logo" style="max-width: 140px; width: 100%; height: auto; margin: 0 auto 15px; display: block; background: white; padding: 10px 15px; border-radius: 8px;" width="140">
        <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0 0 8px; line-height: 1.3;">Welcome to Laminance Cabinetry!</h1>
        <p style="color: rgba(255, 255, 255, 0.9); font-size: 15px; margin: 0;">Your account has been successfully created</p>
      </div>
      
      <!-- Main Content -->
      <div class="content" style="padding: 30px 25px;">
        <div class="greeting" style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 500;">
          Hello <strong style="color: #1e3a8a; font-weight: 700;">${name}</strong>,
        </div>
        
        <!-- Welcome Section with Fixed Tick -->
        <div class="welcome-section" style="background: #f0f9ff; padding: 25px 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin-bottom: 25px; text-align: center;">
          
          <h2 style="color: #1e3a8a; font-size: 18px; margin: 0 0 8px; font-weight: 700; line-height: 1.4;">Account Created Successfully!</h2>
          <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.5;">
            Welcome to Laminance Cabinetry! We're excited to have you join our community.
          </p>
        </div>
        
        <!-- Credentials Card - Fixed Overflow -->
        <div class="credentials-card" style="background: #ffffff; padding: 20px; border-radius: 12px; border: 2px solid #e2e8f0; margin: 25px 0; overflow: hidden;">
          <div class="credentials-title" style="font-size: 18px; font-weight: 700; color: #1e3a8a; margin-bottom: 18px; text-align: center;">Your Login Details</div>
          
          <div class="detail-item" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px; background: #f8fafc; border-radius: 10px; margin-bottom: 12px; word-break: break-word; overflow-wrap: break-word;">
            <div class="detail-icon" style="width: 24px; text-align: center; font-size: 18px; flex-shrink: 0;">📧</div>
            <div class="detail-content" style="flex: 1; min-width: 0;">
              <div class="detail-label" style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 4px;">Email</div>
              <div class="detail-value" style="font-size: 15px; font-weight: 600; color: #1e293b; word-break: break-all; overflow-wrap: break-word; line-height: 1.4;">${email}</div>
            </div>
          </div>
          
          <div class="detail-item" style="display: flex; align-items: flex-start; gap: 12px; padding: 14px; background: #f8fafc; border-radius: 10px; margin-bottom: 0; word-break: break-word; overflow-wrap: break-word;">
            <div class="detail-icon" style="width: 24px; text-align: center; font-size: 18px; flex-shrink: 0;">🔑</div>
            <div class="detail-content" style="flex: 1; min-width: 0;">
              <div class="detail-label" style="font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 4px;">Password</div>
              <div class="detail-value" style="font-size: 15px; font-weight: 600; color: #1e293b; word-break: break-all; overflow-wrap: break-word; line-height: 1.4;">${password}</div>
            </div>
          </div>
        </div>
        
        <!-- Login Section -->
        <div class="login-section" style="text-align: center; margin: 25px 0;">
          <p style="color: #64748b; font-size: 14px; margin-bottom: 15px;">Click the button below to login to your account:</p>
          
          <a href="${loginUrl}" class="login-button" style="display: inline-block; background: #3b82f6; color: white !important; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; font-size: 15px; border: none; cursor: pointer; width: auto; max-width: 100%;">
            Login to Your Account
          </a>
        </div>
        
        <!-- Closing Message -->
        <div class="closing-message" style="text-align: center; margin-top: 25px; padding: 20px 15px; background: #f8fafc; border-radius: 10px;">
          <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.5;">
            We look forward to helping you create beautiful spaces with our premium cabinetry solutions.
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer" style="background: #1e293b; color: white; padding: 25px 20px; text-align: center;">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance Cabinetry" class="footer-logo" style="max-width: 110px; width: 100%; height: auto; margin: 0 auto 20px; display: block; background: white; padding: 8px 12px; border-radius: 6px;" width="110">
        
        <div class="contact-info" style="margin: 15px 0; font-size: 13px; line-height: 1.8;">
          <p style="margin: 5px 0; opacity: 0.9;"><strong>📞 (862) 450-6069</strong></p>
          <p style="margin: 5px 0; opacity: 0.9;"><strong>✉️ Contactus@laminance.com</strong></p>
          <p style="margin: 5px 0; opacity: 0.9;"><strong>🏢 418 Rt 23, Franklin, NJ 07416</strong></p>
        </div>
        
        <div class="copyright" style="font-size: 11px; opacity: 0.6; margin-top: 20px; line-height: 1.6;">
          <p style="margin: 3px 0;">&copy; ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.</p>
          <p style="margin: 3px 0;">This is an automated welcome email. Please do not reply to this message.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};

export default getEmailTemplate;