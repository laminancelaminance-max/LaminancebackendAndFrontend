// File: Utils/contactEmailTemplates.js

// Admin email template for contact form submissions
export const getAdminContactEmailTemplate = (contactData) => {
  const { name, email, phone, address, subject, message } = contactData;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry - Laminance Cabinetry</title>
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
      background: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    
    .container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border: 1px solid #e0e0e0;
    }
    
    .header {
      background: linear-gradient(135deg, #2c2416 0%, #1a140a 100%);
      color: #d4b778;
      padding: 30px;
      text-align: center;
      border-bottom: 3px solid #d4b778;
    }
    
    .logo-container {
      margin-bottom: 20px;
    }
    
    .logo {
      height: 50px;
      width: auto;
      filter: drop-shadow(0 2px 4px rgba(212, 183, 120, 0.3));
    }
    
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 700;
      color: #f5e9d0;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }
    
    .header p {
      font-size: 14px;
      color: #d4b778;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    
    .content {
      padding: 30px;
    }
    
    .alert-badge {
      display: inline-block;
      background: #dc2626;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 25px;
    }
    
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 600;
      color: #2c2416;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0e9db;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .section-title::before {
      content: '📋';
      font-size: 22px;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .contact-card {
      background: #f8f5f0;
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #d4b778;
    }
    
    .contact-card h3 {
      color: #2c2416;
      margin-bottom: 10px;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .contact-card p {
      color: #5a4c30;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .message-section {
      background: #f0f7ff;
      padding: 25px;
      border-radius: 10px;
      margin: 25px 0;
      border: 2px solid #dbeafe;
    }
    
    .message-section h3 {
      color: #1e40af;
      margin-bottom: 15px;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .message-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      font-size: 14px;
      line-height: 1.7;
      color: #4b5563;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin: 30px 0;
    }
    
    .action-button {
      display: block;
      text-align: center;
      padding: 14px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    
    .primary-button {
      background: linear-gradient(135deg, #2c2416 0%, #1a140a 100%);
      color: #d4b778;
      border: 2px solid #d4b778;
    }
    
    .primary-button:hover {
      background: #1a140a;
      transform: translateY(-2px);
    }
    
    .secondary-button {
      background: white;
      color: #2c2416;
      border: 2px solid #d4b778;
    }
    
    .secondary-button:hover {
      background: #f8f5f0;
      transform: translateY(-2px);
    }
    
    .meta-info {
      margin-top: 25px;
      padding: 20px;
      background: #f8f5f0;
      border-radius: 10px;
      font-size: 12px;
      color: #8b7a4e;
      border-left: 4px solid #8b7a4e;
    }
    
    .footer {
      background: #f8f5f0;
      padding: 25px 30px;
      text-align: center;
      border-top: 2px solid #e8dcc6;
    }
    
    .footer p {
      color: #5a4c30;
      font-size: 12px;
      line-height: 1.6;
    }

    .footer {
  background: linear-gradient(135deg, #1a140a 0%, #2c2416 100%);
  color: #d4b778;
  padding: 60px 30px 40px;
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
  gap: 50px;
  margin-bottom: 40px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

.footer-logo {
  height: 80px;
  width: auto;
  filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(30deg);
  opacity: 0.9;
  transition: transform 0.3s ease;
}

.footer-logo:hover {
  transform: scale(1.05);
}

.footer-brand-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #f5e9d0;
  margin: 0;
  letter-spacing: 1px;
  font-weight: 700;
}

.footer-tagline {
  color: #d4b778;
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.9;
  font-weight: 500;
}

.footer-contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(212, 183, 120, 0.2);
  transition: all 0.3s ease;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.contact-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-5px);
  border-color: rgba(212, 183, 120, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.contact-card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(212, 183, 120, 0.2) 0%, rgba(139, 107, 62, 0.2) 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #f5e9d0;
  flex-shrink: 0;
}

.contact-card-content {
  flex: 1;
}

.contact-card-title {
  font-size: 18px;
  color: #f5e9d0;
  margin: 0 0 20px 0;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.address {
  color: #d4b778;
  line-height: 1.6;
  font-size: 15px;
}

.address strong {
  color: #f5e9d0;
  font-size: 16px;
  display: block;
  margin-bottom: 8px;
}

.location-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
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
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(212, 183, 120, 0.1);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon-small {
  font-size: 16px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.contact-link {
  color: #d4b778;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #f5e9d0;
  text-decoration: underline;
}

.hours-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(212, 183, 120, 0.1);
}

.hours-row:last-child {
  border-bottom: none;
}

.day {
  color: #d4b778;
  font-size: 14px;
  font-weight: 500;
}

.time {
  color: #f5e9d0;
  font-size: 14px;
  font-weight: 600;
}

.time.closed {
  color: #ff9e9e;
  background: rgba(255, 158, 158, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
}

.hours-note {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #d4b778;
  font-size: 13px;
  font-style: italic;
  margin-top: 10px;
  padding: 12px;
  background: rgba(212, 183, 120, 0.05);
  border-radius: 10px;
  border-left: 3px solid #d4b778;
}

.hours-icon {
  font-size: 16px;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(212, 183, 120, 0.3), transparent);
  margin: 40px 0;
}

.footer-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.footer-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px;
  background: linear-gradient(135deg, #8b6b3c 0%, #6b4f28 100%);
  color: white;
  text-decoration: none;
  border-radius: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 16px;
  border: 2px solid rgba(212, 183, 120, 0.3);
  text-align: center;
}

.footer-action-button:hover {
  background: linear-gradient(135deg, #6b4f28 0%, #4a361b 100%);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(139, 107, 62, 0.4);
  border-color: #d4b778;
}

.copyright-section {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(212, 183, 120, 0.2);
}

.copyright {
  color: #8b7a4e;
  font-size: 14px;
  line-height: 1.6;
}

.copyright p {
  margin: 0 0 15px 0;
  opacity: 0.8;
}

.copyright p:last-child {
  margin-bottom: 0;
}

.legacy-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 12px 25px;
  background: rgba(212, 183, 120, 0.1);
  color: #d4b778;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  border: 1px solid rgba(212, 183, 120, 0.2);
}

.legacy-icon {
  font-size: 16px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .footer {
    padding: 50px 25px 30px;
  }
  
  .footer-contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }
  
  .footer-actions {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 25px;
  }
  
  .footer-top {
    gap: 40px;
  }
  
  .footer-title {
    font-size: 28px;
  }
  
  .footer-tagline {
    font-size: 15px;
  }
  
  .footer-contact-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .contact-card {
    padding: 20px;
  }
  
  .contact-card-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
  
  .footer-actions {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .footer-action-button {
    padding: 16px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 30px 15px 20px;
  }
  
  .footer-logo {
    height: 60px;
  }
  
  .footer-title {
    font-size: 24px;
  }
  
  .footer-tagline {
    font-size: 14px;
    letter-spacing: 1px;
  }
  
  .contact-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .contact-card-icon {
    margin: 0 auto;
  }
  
  .contact-item {
    justify-content: center;
  }
  
  .hours-row {
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }
  
  .copyright {
    font-size: 13px;
  }
  
  .legacy-tag {
    font-size: 13px;
    padding: 10px 20px;
  }
}
    
    @media (max-width: 600px) {
      .container {
        border-radius: 8px;
        margin: 10px;
      }
      
      .header {
        padding: 25px 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .content {
        padding: 20px;
      }
      
      .contact-grid {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        grid-template-columns: 1fr;
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
      <h1>New Contact Inquiry</h1>
      <p>Laminance Cabinetry Contact Form</p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="alert-badge">NEW INQUIRY - ACTION REQUIRED</div>
      
      <div class="section-title">Contact Information</div>
      
      <div class="contact-grid">
        <div class="contact-card">
          <h3>👤 Personal Details</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        </div>
        
        ${address && (address.street || address.city) ? `
        <div class="contact-card">
          <h3>📍 Address</h3>
          <p>${address.street || ''}</p>
          ${address.city ? `<p>${address.city}, ${address.state || ''} ${address.zipCode || ''}</p>` : ''}
          ${address.country ? `<p>${address.country}</p>` : ''}
        </div>
        ` : ''}
      </div>
      
      <div class="contact-card">
        <h3>📝 Inquiry Details</h3>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
      
      <div class="message-section">
        <h3>💬 Customer Message</h3>
        <div class="message-content">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${email}" class="action-button primary-button">
          ✉️ Reply to Customer
        </a>
        <a href="tel:${phone || '(862) 450-6069'}" class="action-button secondary-button">
          📞 Call Customer
        </a>
      </div>
      
      <div class="meta-info">
        <p><strong>🔍 Inquiry ID:</strong> ${Date.now()}</p>
        <p><strong>📊 Source:</strong> Website Contact Form</p>
        <p><strong>⏰ Response Time:</strong> Please respond within 24-48 hours</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>
        <strong>Laminance Cabinetry Admin Portal</strong><br>
        This email was automatically generated from the website contact form.<br>
        Please do not reply directly to this email. Use the reply button above.
      </p>
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
      padding: 20px;
    }
    
    .container {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 25px 60px rgba(139, 107, 62, 0.15);
      border: 1px solid #e8dcc6;
    }
    
    .header {
      background: linear-gradient(135deg, #2c2416 0%, #1a140a 100%);
      color: #d4b778;
      padding: 50px 30px;
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
    }
    
    .logo {
      height: 80px;
      width: auto;
      filter: drop-shadow(0 4px 15px rgba(212, 183, 120, 0.3));
    }
    
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 15px;
      position: relative;
      z-index: 2;
      color: #f5e9d0;
      letter-spacing: 0.5px;
    }
    
    .header p {
      font-size: 18px;
      color: #d4b778;
      position: relative;
      z-index: 2;
      font-weight: 400;
      letter-spacing: 1px;
    }
    
    .content {
      padding: 40px 30px;
      background: #fffefb;
    }
    
    .greeting {
      font-size: 24px;
      color: #2c2416;
      margin-bottom: 25px;
      font-weight: 600;
      text-align: center;
    }
    
    .thank-you-section {
      text-align: center;
      margin-bottom: 35px;
      padding-bottom: 30px;
      border-bottom: 2px solid #f0e9db;
    }
    
    .thank-you-section p {
      color: #5a4c30;
      font-size: 16px;
      line-height: 1.8;
      max-width: 550px;
      margin: 0 auto;
    }
    
    .confirmation-card {
      background: linear-gradient(135deg, #f8f5f0 0%, #fffefb 100%);
      padding: 35px;
      border-radius: 16px;
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
      font-size: 24px;
      font-weight: 600;
      color: #2c2416;
      margin-bottom: 25px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .confirmation-title::before {
      content: '✅';
      font-size: 28px;
    }
    
    .detail-item {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e8e2d6;
    }
    
    .detail-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    .detail-label {
      font-size: 14px;
      color: #8b7a4e;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    
    .detail-value {
      font-size: 16px;
      font-weight: 500;
      color: #2c2416;
      line-height: 1.6;
    }
    
    .message-preview {
      background: white;
      padding: 25px;
      border-radius: 12px;
      border: 2px solid #e8dcc6;
      margin: 25px 0;
    }
    
    .message-preview h4 {
      color: #2c2416;
      margin-bottom: 15px;
      font-size: 18px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .message-content {
      color: #5a4c30;
      font-size: 15px;
      line-height: 1.7;
      background: #f8f5f0;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #d4b778;
    }
    
    .next-steps {
      background: linear-gradient(135deg, #f0f7e8 0%, #e8f4e0 100%);
      padding: 30px;
      border-radius: 16px;
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
    }
    
    .contact-info {
      background: #f8f5f0;
      padding: 30px;
      border-radius: 16px;
      border: 2px solid #e8dcc6;
      margin: 30px 0;
      text-align: center;
    }
    
    .contact-info h3 {
      color: #2c2416;
      margin-bottom: 20px;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    .contact-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 25px;
    }
    
    .contact-detail {
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(139, 107, 62, 0.1);
    }
    
    .contact-detail h4 {
      color: #2c2416;
      margin-bottom: 10px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .contact-detail p {
      color: #5a4c30;
      font-size: 15px;
      font-weight: 600;
    }
    
    .footer {
      background: linear-gradient(135deg, #1a140a 0%, #2c2416 100%);
      color: #d4b778;
      padding: 50px 30px;
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
    
    .footer-logo {
      height: 50px;
      width: auto;
      filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(30deg);
      opacity: 0.9;
      margin-bottom: 20px;
    }
    
    .footer-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      color: #f5e9d0;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    
    .footer-tagline {
      color: #d4b778;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 30px;
      opacity: 0.8;
    }
    
    .hours-note {
      font-size: 13px;
      color: #d4b778;
      margin: 20px 0;
      opacity: 0.9;
      font-style: italic;
    }
    
    .copyright {
      font-size: 12px;
      color: #8b7a4e;
      margin-top: 30px;
      line-height: 1.8;
      padding-top: 25px;
      border-top: 1px solid rgba(212, 183, 120, 0.2);
      position: relative;
      z-index: 2;
    }
    
    @media (max-width: 600px) {
      .container {
        border-radius: 12px;
        margin: 10px;
      }
      
      .header {
        padding: 40px 20px;
      }
      
      .header h1 {
        font-size: 28px;
      }
      
      .logo {
        height: 60px;
      }
      
      .content {
        padding: 25px 20px;
      }
      
      .contact-details {
        grid-template-columns: 1fr;
      }
      
      .footer-logo {
        height: 40px;
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
        Dear <strong>${name}</strong>,
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
        
        <div class="detail-item">
          <div class="detail-label">Inquiry ID</div>
          <div class="detail-value">LC${Date.now().toString().slice(-8)}</div>
        </div>
        
        <div class="detail-item">
          <div class="detail-label">Reference</div>
          <div class="detail-value">${subject}</div>
        </div>
        
        <div class="detail-item">
          <div class="detail-label">Submitted</div>
          <div class="detail-value">${new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</div>
        </div>
        
        <div class="detail-item">
          <div class="detail-label">Contact Email</div>
          <div class="detail-value">${email}</div>
        </div>
      </div>
      
      <!-- Message Preview -->
      <div class="message-preview">
        <h4>📝 Your Message</h4>
        <div class="message-content">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
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
  <!-- Top Section with Logo and Contact Info -->
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