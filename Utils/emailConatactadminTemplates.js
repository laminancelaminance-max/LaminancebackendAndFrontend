const generateAdminEmail = (contactData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; color: white; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; }
        .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .detail-row { margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #555; min-width: 100px; display: inline-block; }
        .message-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>You have received a new message from your website contact form</p>
        </div>
        
        <div class="content">
          <h2>Contact Details</h2>
          <div class="details">
            <div class="detail-row">
              <span class="label">👤 Name:</span>
              <span>${contactData.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">📧 Email:</span>
              <span><a href="mailto:${contactData.email}">${contactData.email}</a></span>
            </div>
            <div class="detail-row">
              <span class="label">📌 Subject:</span>
              <span>${contactData.subject}</span>
            </div>
            <div class="detail-row">
              <span class="label">🕐 Submitted:</span>
              <span>${new Date(contactData.createdAt).toLocaleString()}</span>
            </div>
            ${contactData.ipAddress ? `
            <div class="detail-row">
              <span class="label">🌐 IP Address:</span>
              <span>${contactData.ipAddress}</span>
            </div>` : ''}
          </div>
          
          <h2>Message Content</h2>
          <div class="message-box">
            <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>⚠️ Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
            <p>Quick Reply: <a href="mailto:${contactData.email}?subject=Re: ${encodeURIComponent(contactData.subject)}">Click here to reply</a></p>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from your website contact form.</p>
          <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateUserEmail = (contactData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; color: white; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; }
        .thank-you { text-align: center; margin: 20px 0; }
        .message-copy { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50; }
        .details { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Message Received!</h1>
          <p>Thank you for contacting us. Here's a copy of your message.</p>
        </div>
        
        <div class="content">
          <div class="thank-you">
            <h2>Thank You, ${contactData.name}!</h2>
            <p>We have received your message and will get back to you within 24 hours.</p>
          </div>
          
          <div class="details">
            <p><strong>📌 Reference:</strong> ${contactData.subject}</p>
            <p><strong>🕐 Submitted:</strong> ${new Date(contactData.createdAt).toLocaleString()}</p>
          </div>
          
          <h3>Your Message:</h3>
          <div class="message-copy">
            <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="background: #e8f4fc; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p><strong>📋 What happens next?</strong></p>
            <ul>
              <li>Our team will review your message</li>
              <li>We'll respond to ${contactData.email} within 24 hours</li>
              <li>You can expect a detailed response to your inquiry</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>Need immediate assistance?</p>
            <a href="mailto:${process.env.ADMIN_EMAIL}" style="background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Email Us Directly</a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated confirmation. Please do not reply to this email.</p>
          <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = { generateAdminEmail, generateUserEmail };