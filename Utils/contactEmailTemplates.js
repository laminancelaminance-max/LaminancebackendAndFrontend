// File: Utils/contactEmailTemplates.js

// Admin email template for contact form submissions
export const getAdminContactEmailTemplate = (contactData) => {
  const { name, email, phone, address = {}, subject, message } = contactData;
  
  // Format address if exists
  const formattedAddress = address.street || address.city || address.state || address.zipCode || address.country 
    ? `${address.street || ''}${address.street && (address.city || address.state || address.zipCode) ? '<br>' : ''}${address.city || ''}${address.city && address.state ? ', ' : ''}${address.state || ''} ${address.zipCode || ''}${address.country ? '<br>' + address.country : ''}`
    : 'Not provided';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry - Laminance Cabinetry</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.5;
      color: #1e293b;
      background: #f1f5f9;
      margin: 0;
      padding: 24px;
      -webkit-font-smoothing: antialiased;
    }
    
    .container {
      max-width: 720px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 32px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    /* Modern Gradient Header */
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
      padding: 48px 40px;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(100px, -100px);
    }
    
    .header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50px, 50px);
    }
    
    .logo-wrapper {
      position: relative;
      z-index: 10;
      display: inline-flex;
      align-items: center;
      gap: 16px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      padding: 12px 24px 12px 20px;
      border-radius: 100px;
      border: 1px solid rgba(255,255,255,0.2);
      margin-bottom: 32px;
    }
    
    .logo {
      height: 40px;
      width: auto;
      filter: brightness(0) invert(1);
    }
    
    .logo-text {
      color: #ffffff;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.5px;
      opacity: 0.9;
    }
    
    .header h1 {
      font-size: 42px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
      line-height: 1.2;
      position: relative;
      z-index: 10;
    }
    
    .header .subtitle {
      font-size: 16px;
      color: #cbd5e1;
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .header .subtitle span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.1);
      padding: 4px 12px;
      border-radius: 40px;
      font-size: 14px;
      color: #f1f5f9;
    }
    
    /* Status Banner */
    .status-banner {
      background: #fef2f2;
      border-left: 4px solid #dc2626;
      margin: -24px 40px 0;
      padding: 20px 24px;
      border-radius: 16px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .status-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .status-icon {
      width: 48px;
      height: 48px;
      background: #fee2e2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    
    .status-text h3 {
      font-size: 18px;
      font-weight: 600;
      color: #991b1b;
      margin-bottom: 4px;
    }
    
    .status-text p {
      font-size: 14px;
      color: #b91c1c;
    }
    
    .status-badge {
      background: #dc2626;
      color: white;
      padding: 8px 20px;
      border-radius: 40px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    /* Content Area */
    .content {
      padding: 48px 40px;
    }
    
    /* Modern Card Grid */
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 32px;
    }
    
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 24px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    
    .card:hover {
      border-color: #cbd5e1;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .card-icon {
      width: 40px;
      height: 40px;
      background: #f1f5f9;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    
    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
    }
    
    .card-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    
    .info-label {
      min-width: 70px;
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }
    
    .info-value {
      font-size: 15px;
      color: #0f172a;
      font-weight: 500;
      flex: 1;
      word-break: break-word;
    }
    
    .info-value a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }
    
    .info-value a:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
    
    /* Address Block */
    .address-block {
      background: #f8fafc;
      border-radius: 16px;
      padding: 16px;
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.6;
      color: #334155;
      border: 1px solid #e2e8f0;
    }
    
    /* Message Section */
    .message-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 32px;
      margin: 32px 0;
    }
    
    .message-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .message-header h3 {
      font-size: 20px;
      font-weight: 600;
      color: #0f172a;
    }
    
    .message-badge {
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 12px;
      border-radius: 40px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .message-body {
      background: #ffffff;
      border-radius: 16px;
      padding: 24px;
      font-size: 15px;
      line-height: 1.7;
      color: #334155;
      border: 1px solid #e2e8f0;
      white-space: pre-wrap;
      max-height: 300px;
      overflow-y: auto;
    }
    
    /* Action Buttons */
    .action-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 32px 0;
    }
    
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 16px 24px;
      border-radius: 16px;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s ease;
      text-decoration: none;
      border: none;
      cursor: pointer;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.2);
    }
    
    .btn-secondary {
      background: #f1f5f9;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }
    
    .btn-secondary:hover {
      background: #e2e8f0;
      transform: translateY(-2px);
    }
    
    /* Meta Grid */
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-top: 32px;
      padding: 24px;
      background: #f8fafc;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
    }
    
    .meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .meta-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .meta-value {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
    }
    
    .priority-high {
      color: #dc2626;
      background: #fee2e2;
      padding: 4px 8px;
      border-radius: 40px;
      font-size: 12px;
      display: inline-block;
      width: fit-content;
    }
    
    /* Footer */
    .footer {
      background: #f8fafc;
      padding: 40px;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .footer-logo {
      height: 32px;
      width: auto;
      opacity: 0.8;
    }
    
    .footer-links {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
    }
    
    .footer-link {
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 0.2s ease;
    }
    
    .footer-link:hover {
      color: #0f172a;
    }
    
    .footer-bottom {
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #94a3b8;
      font-size: 13px;
    }
    
    /* Responsive */
    @media (max-width: 640px) {
      body {
        padding: 16px;
      }
      
      .container {
        border-radius: 24px;
      }
      
      .header {
        padding: 32px 24px;
      }
      
      .header h1 {
        font-size: 32px;
      }
      
      .status-banner {
        margin: -16px 24px 0;
        padding: 16px;
      }
      
      .content {
        padding: 32px 24px;
      }
      
      .grid-2 {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .action-grid {
        grid-template-columns: 1fr;
      }
      
      .meta-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .footer-top {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    
    @media (max-width: 480px) {
      .meta-grid {
        grid-template-columns: 1fr;
      }
      
      .status-banner {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Modern Header -->
    <div class="header">
      <div class="logo-wrapper">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" 
             alt="Laminance Cabinetry" 
             class="logo">
        <span class="logo-text">LAMINANCE CABINETRY</span>
      </div>
      <h1>New Contact<br>Inquiry Received</h1>
      <div class="subtitle">
        <span>📬 Website Contact Form</span>
        <span>⚡ Action Required</span>
      </div>
    </div>
    
    <!-- Status Banner -->
    <div class="status-banner">
      <div class="status-left">
        <div class="status-icon">🔔</div>
        <div class="status-text">
          <h3>New Customer Inquiry</h3>
          <p>Requires attention within 24 hours</p>
        </div>
      </div>
      <div class="status-badge">PRIORITY</div>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <!-- Contact Information Grid -->
      <div class="grid-2">
        <!-- Personal Details Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-icon">👤</div>
            <h3 class="card-title">Personal Details</h3>
          </div>
          <div class="card-content">
            <div class="info-item">
              <span class="info-label">Name</span>
              <span class="info-value">${name || 'Not provided'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">
                <a href="mailto:${email}">${email || 'Not provided'}</a>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone</span>
              <span class="info-value">
                ${phone ? `<a href="tel:${phone}">${phone}</a>` : 'Not provided'}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Inquiry Details Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-icon">📋</div>
            <h3 class="card-title">Inquiry Details</h3>
          </div>
          <div class="card-content">
            <div class="info-item">
              <span class="info-label">Subject</span>
              <span class="info-value">${subject || 'General Inquiry'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">ID</span>
              <span class="info-value">#${Date.now().toString().slice(-8)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Received</span>
              <span class="info-value">
                ${new Date().toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Address Card -->
      <div class="card" style="margin-bottom: 32px;">
        <div class="card-header">
          <div class="card-icon">📍</div>
          <h3 class="card-title">Address Information</h3>
        </div>
        <div class="address-block">
          ${formattedAddress}
        </div>
      </div>
      
      <!-- Message Section -->
      <div class="message-card">
        <div class="message-header">
          <div class="card-icon">💬</div>
          <h3>Customer Message</h3>
          <span class="message-badge">DIRECT FROM CUSTOMER</span>
        </div>
        <div class="message-body">
          ${message ? message.replace(/\n/g, '<br>') : 'No message provided'}
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-grid">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || 'Your Inquiry')}" class="btn btn-primary">
          <span>✉️</span>
          <span>Reply to Customer</span>
        </a>
        <a href="tel:${phone || '(862) 450-6069'}" class="btn btn-secondary">
          <span>📞</span>
          <span>${phone ? 'Call Customer' : 'Call Office'}</span>
        </a>
      </div>
      
      <!-- Meta Information -->
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">Inquiry ID</span>
          <span class="meta-value">#${Date.now().toString().slice(-8)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Source</span>
          <span class="meta-value">Website Form</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Priority</span>
          <span class="meta-value priority-high">High</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Response Due</span>
          <span class="meta-value">Within 24h</span>
        </div>
      </div>
    </div>
    
    <!-- Modern Footer -->
    <div class="footer">
      <div class="footer-top">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" 
             alt="Laminance Cabinetry" 
             class="logo">
        <div class="footer-links">
          <a href="tel:(862)450-6069" class="footer-link">📞 (862) 450-6069</a>
          <a href="mailto:contact@laminance.com" class="footer-link">✉️ contact@laminance.com</a>
          <a href="https://laminancecabinetry.com" class="footer-link">🌐 laminancecabinetry.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.</p>
        <p style="margin-top: 8px; font-size: 12px;">This is an automated notification from your website contact form. Please do not reply directly to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
};

// User confirmation email template
export const getUserContactEmailTemplate = (contactData) => {
  const { name, email, subject, message } = contactData;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Laminance Cabinetry</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #f8f5f0 0%, #e8e2d6 100%);
      margin: 0;
      padding: 15px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .container {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 15px 40px rgba(139, 107, 62, 0.12);
      border: 1px solid #e8dcc6;
    }
    
    /* Header Styles */
    .header {
      background: linear-gradient(135deg, #2c2416 0%, #1a140a 100%);
      color: #d4b778;
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-bottom: 4px solid #d4b778;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" stroke="%23d4b778" stroke-width="0.5" opacity="0.1"/></svg>');
      background-size: 20px 20px;
    }
    
    .logo-container {
      margin-bottom: 25px;
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
    }
    
    .logo {
      height: 70px;
      width: auto;
      max-width: 100%;
      filter: drop-shadow(0 4px 12px rgba(212, 183, 120, 0.3));
      object-fit: contain;
    }
    
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 15px;
      position: relative;
      z-index: 2;
      color: #f5e9d0;
      letter-spacing: 0.3px;
      line-height: 1.2;
    }
    
    .header p {
      font-size: 16px;
      color: #d4b778;
      position: relative;
      z-index: 2;
      font-weight: 400;
      letter-spacing: 1px;
      line-height: 1.4;
    }
    
    /* Content Styles */
    .content {
      padding: 35px 30px;
      background: #fffefb;
    }
    
    .greeting {
      font-size: 22px;
      color: #2c2416;
      margin-bottom: 25px;
      font-weight: 600;
      text-align: center;
      line-height: 1.3;
    }
    
    .thank-you-section {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 25px;
      border-bottom: 2px solid #f0e9db;
    }
    
    .thank-you-section p {
      color: #5a4c30;
      font-size: 16px;
      line-height: 1.7;
      max-width: 550px;
      margin: 0 auto;
    }
    
    /* Confirmation Card */
    .confirmation-card {
      background: linear-gradient(135deg, #f8f5f0 0%, #fffefb 100%);
      padding: 30px;
      border-radius: 14px;
      border: 2px solid #e8dcc6;
      margin-bottom: 30px;
      position: relative;
      overflow: hidden;
    }
    
    .confirmation-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background: linear-gradient(to bottom, #d4b778, #b89446);
    }
    
    .confirmation-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 600;
      color: #2c2416;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 12px;
      line-height: 1.2;
    }
    
    .confirmation-title::before {
      content: '✅';
      font-size: 26px;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .detail-item {
      padding: 12px 0;
    }
    
    .detail-label {
      font-size: 13px;
      color: #8b7a4e;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: block;
    }
    
    .detail-value {
      font-size: 15px;
      font-weight: 500;
      color: #2c2416;
      line-height: 1.5;
      word-break: break-word;
    }
    
    /* Message Preview */
    .message-preview {
      background: white;
      padding: 25px;
      border-radius: 12px;
      border: 2px solid #e8dcc6;
      margin: 30px 0;
    }
    
    .message-preview h4 {
      color: #2c2416;
      margin-bottom: 20px;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      line-height: 1.2;
    }
    
    .message-content {
      color: #5a4c30;
      font-size: 15px;
      line-height: 1.7;
      background: #f8f5f0;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #d4b778;
      max-height: 300px;
      overflow-y: auto;
      white-space: pre-wrap;
    }
    
    /* Next Steps */
    .next-steps {
      background: linear-gradient(135deg, #f0f7e8 0%, #e8f4e0 100%);
      padding: 30px;
      border-radius: 14px;
      border: 2px solid #c5d8a4;
      margin: 30px 0;
    }
    
    .next-steps h3 {
      color: #2c2416;
      margin-bottom: 20px;
      font-size: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      line-height: 1.2;
    }
    
    .steps-list {
      list-style: none;
      padding: 0;
    }
    
    .steps-list li {
      padding: 12px 0;
      display: flex;
      align-items: flex-start;
      gap: 15px;
      color: #5a4c30;
      line-height: 1.5;
    }
    
    .steps-list li::before {
      content: '✓';
      background: #d4b778;
      color: #2c2416;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
      font-size: 14px;
    }
    
    /* Contact Info */
    .contact-info {
      background: #f8f5f0;
      padding: 30px;
      border-radius: 14px;
      border: 2px solid #e8dcc6;
      margin: 30px 0;
      text-align: center;
    }
    
    .contact-info h3 {
      color: #2c2416;
      margin-bottom: 20px;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      line-height: 1.2;
    }
    
    .contact-details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 25px;
    }
    
    .contact-detail {
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(139, 107, 62, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .contact-detail:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(139, 107, 62, 0.15);
    }
    
    .contact-detail h4 {
      color: #2c2416;
      margin-bottom: 12px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      line-height: 1.2;
    }
    
    .contact-detail p {
      color: #5a4c30;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.5;
    }
    
    /* Footer */
    .footer {
      background: linear-gradient(135deg, #1a140a 0%, #2c2416 100%);
      color: #d4b778;
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, #d4b778, transparent);
    }
    
    .footer-top {
      display: flex;
      flex-direction: column;
      gap: 35px;
      margin-bottom: 30px;
    }
    
    .footer-brand {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }
    
    .footer-logo {
      height: 60px;
      width: auto;
      max-width: 100%;
      filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(30deg);
      opacity: 0.9;
      object-fit: contain;
    }
    
    .footer-brand-text {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .footer-title {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: #f5e9d0;
      margin: 0;
      letter-spacing: 0.5px;
      font-weight: 700;
      line-height: 1.2;
    }
    
    .footer-tagline {
      color: #d4b778;
      font-size: 14px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      opacity: 0.9;
      font-weight: 500;
      line-height: 1.3;
    }
    
    .footer-contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .contact-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 14px;
      padding: 25px;
      border: 1px solid rgba(212, 183, 120, 0.2);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .contact-card:hover {
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-3px);
      border-color: rgba(212, 183, 120, 0.4);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }
    
    .contact-card-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, rgba(212, 183, 120, 0.2) 0%, rgba(139, 107, 62, 0.2) 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #f5e9d0;
      margin: 0 auto;
    }
    
    .contact-card-content {
      flex: 1;
    }
    
    .contact-card-title {
      font-size: 16px;
      color: #f5e9d0;
      margin: 0 0 15px 0;
      font-weight: 600;
      letter-spacing: 0.3px;
      text-align: center;
      line-height: 1.2;
    }
    
    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .address {
      color: #d4b778;
      line-height: 1.5;
      font-size: 14px;
      text-align: center;
    }
    
    .address strong {
      color: #f5e9d0;
      font-size: 15px;
      display: block;
      margin-bottom: 6px;
    }
    
    .location-features {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
      justify-content: center;
    }
    
    .feature-badge {
      background: rgba(212, 183, 120, 0.1);
      color: #d4b778;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      border: 1px solid rgba(212, 183, 120, 0.2);
      line-height: 1;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      justify-content: center;
    }
    
    .contact-icon-small {
      font-size: 15px;
      width: 20px;
      text-align: center;
      flex-shrink: 0;
    }
    
    .contact-link {
      color: #d4b778;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      line-height: 1.3;
    }
    
    .contact-link:hover {
      color: #f5e9d0;
      text-decoration: underline;
    }
    
    .hours-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .hours-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid rgba(212, 183, 120, 0.1);
      flex-wrap: wrap;
    }
    
    .hours-row:last-child {
      border-bottom: none;
    }
    
    .day {
      color: #d4b778;
      font-size: 13px;
      font-weight: 500;
      flex: 1;
      min-width: 120px;
    }
    
    .time {
      color: #f5e9d0;
      font-size: 13px;
      font-weight: 600;
    }
    
    .time.closed {
      color: #ff9e9e;
      background: rgba(255, 158, 158, 0.1);
      padding: 4px 10px;
      border-radius: 10px;
    }
    
    .hours-note {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #d4b778;
      font-size: 12px;
      font-style: italic;
      margin-top: 12px;
      padding: 10px;
      background: rgba(212, 183, 120, 0.05);
      border-radius: 8px;
      border-left: 3px solid #d4b778;
      justify-content: center;
    }
    
    .hours-icon {
      font-size: 14px;
    }
    
    .footer-divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(212, 183, 120, 0.3), transparent);
      margin: 30px 0;
    }
    
    .footer-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .footer-action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 16px;
      background: linear-gradient(135deg, #8b6b3c 0%, #6b4f28 100%);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 14px;
      border: 2px solid rgba(212, 183, 120, 0.3);
      text-align: center;
      min-height: 50px;
    }
    
    .footer-action-button:hover {
      background: linear-gradient(135deg, #6b4f28 0%, #4a361b 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(139, 107, 62, 0.3);
      border-color: #d4b778;
    }
    
    .copyright-section {
      text-align: center;
      padding-top: 25px;
      border-top: 1px solid rgba(212, 183, 120, 0.2);
    }
    
    .copyright {
      color: #8b7a4e;
      font-size: 13px;
      line-height: 1.6;
    }
    
    .copyright p {
      margin: 0 0 12px 0;
      opacity: 0.8;
    }
    
    .copyright p:last-child {
      margin-bottom: 0;
    }
    
    .legacy-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
      padding: 10px 20px;
      background: rgba(212, 183, 120, 0.1);
      color: #d4b778;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      font-style: italic;
      border: 1px solid rgba(212, 183, 120, 0.2);
      line-height: 1.3;
    }
    
    .legacy-icon {
      font-size: 14px;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      body {
        padding: 12px;
      }
      
      .container {
        border-radius: 14px;
        margin: 0 auto;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 26px;
      }
      
      .header p {
        font-size: 15px;
        letter-spacing: 0.8px;
      }
      
      .logo {
        height: 60px;
      }
      
      .content {
        padding: 25px 20px;
      }
      
      .greeting {
        font-size: 20px;
      }
      
      .thank-you-section p {
        font-size: 15px;
      }
      
      .confirmation-card {
        padding: 25px;
      }
      
      .confirmation-title {
        font-size: 20px;
      }
      
      .detail-grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }
      
      .contact-details-grid {
        grid-template-columns: 1fr;
      }
      
      .footer {
        padding: 30px 20px;
      }
      
      .footer-logo {
        height: 50px;
      }
      
      .footer-title {
        font-size: 22px;
      }
      
      .footer-tagline {
        font-size: 13px;
        letter-spacing: 1px;
      }
      
      .footer-contact-grid {
        grid-template-columns: 1fr;
      }
      
      .contact-card {
        flex-direction: column;
        text-align: center;
        gap: 15px;
        padding: 20px;
      }
      
      .contact-card-icon {
        width: 45px;
        height: 45px;
        font-size: 22px;
      }
      
      .contact-card-title {
        font-size: 15px;
        margin-bottom: 12px;
      }
      
      .contact-item {
        justify-content: center;
      }
      
      .hours-row {
        flex-direction: column;
        gap: 5px;
        text-align: center;
      }
      
      .day {
        min-width: auto;
      }
      
      .footer-actions {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .message-content {
        font-size: 14px;
        padding: 15px;
        max-height: 250px;
      }
    }
    
    @media (max-width: 576px) {
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
        height: 50px;
      }
      
      .content {
        padding: 20px 15px;
      }
      
      .greeting {
        font-size: 18px;
      }
      
      .confirmation-title {
        font-size: 18px;
      }
      
      .confirmation-title::before {
        font-size: 22px;
      }
      
      .message-preview {
        padding: 20px;
      }
      
      .message-preview h4 {
        font-size: 16px;
      }
      
      .next-steps h3 {
        font-size: 18px;
      }
      
      .steps-list li {
        font-size: 14px;
        padding: 10px 0;
      }
      
      .footer-actions {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      
      .footer-action-button {
        padding: 14px;
        font-size: 13px;
      }
      
      .legacy-tag {
        font-size: 12px;
        padding: 8px 16px;
      }
      
      .hours-note {
        font-size: 11px;
      }
    }
    
    @media (max-width: 480px) {
      body {
        padding: 10px;
      }
      
      .container {
        border-radius: 12px;
      }
      
      .header h1 {
        font-size: 20px;
      }
      
      .logo {
        height: 45px;
      }
      
      .footer-logo {
        height: 45px;
      }
      
      .footer-title {
        font-size: 20px;
      }
      
      .contact-card {
        padding: 15px;
      }
      
      .feature-badge {
        font-size: 11px;
        padding: 5px 10px;
      }
      
      .detail-label {
        font-size: 12px;
      }
      
      .detail-value {
        font-size: 14px;
      }
      
      .steps-list li::before {
        width: 20px;
        height: 20px;
        font-size: 12px;
      }
      
      .contact-link {
        font-size: 13px;
      }
    }
    
    @media (max-width: 360px) {
      .header h1 {
        font-size: 18px;
      }
      
      .header p {
        font-size: 13px;
      }
      
      .greeting {
        font-size: 17px;
      }
      
      .footer-title {
        font-size: 18px;
      }
      
      .footer-tagline {
        font-size: 12px;
      }
      
      .contact-detail {
        padding: 15px;
      }
      
      .footer-action-button {
        padding: 12px;
        min-height: 45px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo-container">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" 
             alt="Laminance Cabinetry" 
             class="logo">
      </div>
      <h1>Thank You for Contacting Us!</h1>
      <p>Your message has been received</p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="greeting">
        Dear <strong>${name || 'Valued Customer'}</strong>,
      </div>
      
      <div class="thank-you-section">
        <p>
          Thank you for reaching out to <strong>Laminance Cabinetry</strong>! We appreciate your interest 
          in our premium cabinetry services and are excited to assist you with your project.
        </p>
      </div>
      
      <!-- Confirmation Card -->
      <div class="confirmation-card">
        <div class="confirmation-title">Confirmation Details</div>
        
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Inquiry ID</span>
            <span class="detail-value">LC${Date.now().toString().slice(-8)}</span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Reference</span>
            <span class="detail-value">${subject || 'General Inquiry'}</span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Submitted</span>
            <span class="detail-value">
              ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div class="detail-item">
            <span class="detail-label">Contact Email</span>
            <span class="detail-value">${email || 'Not provided'}</span>
          </div>
        </div>
      </div>
      
      <!-- Message Preview -->
      ${message ? `
      <div class="message-preview">
        <h4>📝 Your Message</h4>
        <div class="message-content">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
      ` : ''}
      
      <!-- Next Steps -->
      <div class="next-steps">
        <h3>📋 What Happens Next?</h3>
        <ul class="steps-list">
          <li>Our team will review your inquiry within 24 hours</li>
          <li>You'll receive a personalized response from one of our specialists</li>
          <li>We may schedule a consultation to better understand your needs</li>
          <li>We'll provide you with customized solutions and estimates</li>
        </ul>
      </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" 
               alt="Laminance Cabinetry" 
               class="footer-logo">
          <div class="footer-brand-text">
            <div class="footer-title">Laminance Cabinetry</div>
            <div class="footer-tagline">Precision • Craftsmanship • Elegance</div>
          </div>
        </div>
        
        <div class="footer-contact-grid">
          <!-- Address Card -->
          <div class="contact-card">
            <div class="contact-card-icon">
              <span>📍</span>
            </div>
            <div class="contact-card-content">
              <h4 class="contact-card-title">Visit Our Showroom</h4>
              <div class="contact-details">
                <p class="address">
                  <strong>Laminance Cabinetry</strong><br>
                  418 Rt 23<br>
                  Franklin, NJ 07416
                </p>
                <div class="location-features">
                  <span class="feature-badge">🅿️ Free Parking</span>
                  <span class="feature-badge">✨ Design Gallery</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Card -->
          <div class="contact-card">
            <div class="contact-card-icon">
              <span>📞</span>
            </div>
            <div class="contact-card-content">
              <h4 class="contact-card-title">Get In Touch</h4>
              <div class="contact-details">
                <div class="contact-item">
                  <span class="contact-icon-small">📱</span>
                  <a href="tel:(862) 450-6069" class="contact-link">
                    (862) 450-6069
                  </a>
                </div>
                <div class="contact-item">
                  <span class="contact-icon-small">✉️</span>
                  <a href="mailto:Contactus@laminance.com" class="contact-link">
                    Contactus@laminance.com
                  </a>
                </div>
                <div class="contact-item">
                  <span class="contact-icon-small">🌐</span>
                  <a href="https://laminance.com" class="contact-link">
                    laminance.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Hours Card -->
          <div class="contact-card">
            <div class="contact-card-icon">
              <span>⏰</span>
            </div>
            <div class="contact-card-content">
              <h4 class="contact-card-title">Showroom Hours</h4>
              <div class="hours-details">
                <div class="hours-row">
                  <span class="day">Tuesday - Saturday:</span>
                  <span class="time">9:00 AM - 5:00 PM</span>
                </div>
                <div class="hours-row">
                  <span class="day">Sunday & Monday:</span>
                  <span class="time closed">Closed</span>
                </div>
                <div class="hours-note">
                  <span class="hours-icon">📅</span>
                  Appointments available outside regular hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Divider -->
      <div class="footer-divider"></div>
      
      <!-- Action Buttons -->
      <div class="footer-actions">
        <a href="https://maps.google.com/?q=418+Rt+23+Franklin+NJ+07416" 
           class="footer-action-button" 
           target="_blank">
          <span>📍</span> Get Directions
        </a>
        <a href="tel:(862) 450-6069" class="footer-action-button">
          <span>📞</span> Call Now
        </a>
        <a href="mailto:Contactus@laminance.com" class="footer-action-button">
          <span>✉️</span> Email Us
        </a>
        <a href="https://laminance.com" class="footer-action-button" target="_blank">
          <span>🌐</span> Visit Website
        </a>
      </div>
      
      <!-- Copyright Section -->
      <div class="copyright-section">
        <div class="copyright">
          <p>&copy; ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.</p>
          <p>This is an automated confirmation email. For additional inquiries, please contact us directly.</p>
          <div class="legacy-tag">
            <span class="legacy-icon">🏆</span>
            Crafting beautiful spaces with precision since 2005
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
};