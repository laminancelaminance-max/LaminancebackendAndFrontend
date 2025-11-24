const getEmailTemplate = ({ name, email, password, loginUrl }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Laminance Cabinetry</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #f8fafc;
        margin: 0;
        padding: 20px;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
      
      .header {
        background: #1e3a8a;
        padding: 40px 30px;
        text-align: center;
        color: white;
      }
      
      .logo {
        width: 180px;
        height: auto;
        margin: 0 auto 20px;
        display: block;
        background: white;
        padding: 15px;
        border-radius: 10px;
      }
      
      .header h1 {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      
      .header p {
        font-size: 16px;
        opacity: 0.9;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .greeting {
        font-size: 20px;
        color: #1e293b;
        margin-bottom: 25px;
        font-weight: 600;
      }
      
      .welcome-section {
        background: #f0f9ff;
        padding: 25px;
        border-radius: 12px;
        border-left: 4px solid #3b82f6;
        margin-bottom: 25px;
        text-align: center;
      }
      
      .success-icon {
        width: 60px;
        height: 60px;
        background: #10b981;
        border-radius: 50%;
        margin: 0 auto 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: white;
        font-weight: bold;
      }
      
      .credentials-card {
        background: white;
        padding: 25px;
        border-radius: 12px;
        border: 2px solid #e2e8f0;
        margin: 25px 0;
      }
      
      .credentials-title {
        font-size: 20px;
        font-weight: 700;
        color: #1e3a8a;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .detail-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: #f8fafc;
        border-radius: 8px;
        margin-bottom: 15px;
      }
      
      .detail-icon {
        width: 20px;
        text-align: center;
        font-size: 16px;
      }
      
      .detail-content {
        flex: 1;
      }
      
      .detail-label {
        font-size: 12px;
        color: #64748b;
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 4px;
      }
      
      .detail-value {
        font-size: 16px;
        font-weight: 600;
        color: #1e293b;
      }
      
      .login-section {
        text-align: center;
        margin: 30px 0;
      }
      
      .login-button {
        display: inline-block;
        background: #3b82f6;
        color: white;
        text-decoration: none;
        padding: 15px 40px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        border: none;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      
      .login-button:hover {
        background: #1d4ed8;
      }
      
      .footer {
        background: #1e293b;
        color: white;
        padding: 30px;
        text-align: center;
      }
      
      .footer-logo {
        width: 120px;
        height: auto;
        margin: 0 auto 20px;
        display: block;
        background: white;
        padding: 10px;
        border-radius: 8px;
      }
      
      .contact-info {
        margin: 20px 0;
        font-size: 14px;
        opacity: 0.9;
        line-height: 1.8;
      }
      
      .copyright {
        font-size: 12px;
        opacity: 0.6;
        margin-top: 20px;
        line-height: 1.6;
      }
      
      @media (max-width: 600px) {
        .container {
          margin: 10px;
          border-radius: 10px;
        }
        
        .header {
          padding: 30px 20px;
        }
        
        .content {
          padding: 25px 20px;
        }
        
        .login-button {
          padding: 15px 30px;
          width: 100%;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header Section -->
      <div class="header">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance Cabinetry" class="logo">
        <h1>Welcome to Laminance Cabinetry!</h1>
        <p>Your account has been successfully created</p>
      </div>
      
      <!-- Main Content -->
      <div class="content">
        <div class="greeting">
          Hello <strong>${name}</strong>,
        </div>
        
        <!-- Welcome Section -->
        <div class="welcome-section">
          <div class="success-icon">✓</div>
          <h2 style="color: #1e3a8a; margin-bottom: 10px; font-size: 20px;">Account Created Successfully!</h2>
          <p style="color: #475569;">
            Welcome to Laminance Cabinetry! We're excited to have you join our community.
          </p>
        </div>
        
        <!-- Credentials Card -->
        <div class="credentials-card">
          <div class="credentials-title">Your Login Details</div>
          
          <div class="detail-item">
            <div class="detail-icon">📧</div>
            <div class="detail-content">
              <div class="detail-label">Email</div>
              <div class="detail-value">${email}</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">🔑</div>
            <div class="detail-content">
              <div class="detail-label">Password</div>
              <div class="detail-value">${password}</div>
            </div>
          </div>
        </div>
        
        <!-- Login Section -->
        <div class="login-section">
          <p style="color: #64748b; margin-bottom: 20px;">Click the button below to login to your account:</p>
          
          <a href="${loginUrl}" class="login-button">
            Login to Your Account
          </a>
        </div>
        
        <!-- Closing Message -->
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
          <p style="color: #475569; margin: 0;">
            We look forward to helping you create beautiful spaces with our premium cabinetry solutions.
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance Cabinetry" class="footer-logo">
        
        <div class="contact-info">
          <p><strong>📞 (862) 450-6069</strong></p>
          <p><strong>✉️ Contactus@laminance.com</strong></p>
          <p><strong>🏢 418 Rt 23, Franklin, NJ 07416</strong></p>
        </div>
        
        <div class="copyright">
          <p>&copy; ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.</p>
          <p>This is an automated welcome email. Please do not reply to this message.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};

export default getEmailTemplate;