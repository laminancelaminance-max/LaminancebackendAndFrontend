import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing Resend API Key in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Your existing sendEmail function
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Laminance Cabinetry <admin@devarrd.com>", // Updated with brand name
      to: sendTo,
      subject,
      html,
    });
    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// New function specifically for appointments
export const sendAppointmentEmail = async (appointment) => {
  try {
    const formatTimeForEmail = (timeString) => {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    const calculateEndTime = (startTime, duration) => {
      const [hours, minutes] = startTime.split(':');
      const startDate = new Date();
      startDate.setHours(parseInt(hours), parseInt(minutes));
      const endDate = new Date(startDate.getTime() + duration * 60000);
      return formatTimeForEmail(endDate.toTimeString().slice(0, 5));
    };

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - Laminance Cabinetry</title>
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 20px;
    }
    
    .container {
      max-width: 650px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: white;
      color: #1e3a8a;
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
      border-bottom: 3px solid #f1f5f9;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
      animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(180deg); }
    }
    
    .logo {
      width: 200px;
      height: auto;
      margin: 0 auto 20px;
      display: block;
      background: white;
      padding: 15px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
      color: #1e3a8a;
    }
    
    .header p {
      font-size: 16px;
      color: #64748b;
      position: relative;
      z-index: 2;
      font-weight: 500;
    }
    
    .content {
      padding: 40px 30px;
      background: #f8fafc;
    }
    
    .greeting {
      font-size: 20px;
      color: #1e293b;
      margin-bottom: 25px;
      font-weight: 600;
    }
    
    .appointment-card {
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
      border-left: 5px solid #3b82f6;
      margin-bottom: 25px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .appointment-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    }
    
    .appointment-title {
      font-size: 24px;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .appointment-title::before {
      content: '📅';
      font-size: 28px;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      background: #f1f5f9;
      border-radius: 10px;
      transition: background 0.3s ease;
    }
    
    .detail-item:hover {
      background: #e2e8f0;
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
      letter-spacing: 0.5px;
    }
    
    .detail-value {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    
    .location-section {
      background: white;
      padding: 30px;
      border-radius: 16px;
      border: 2px solid #e2e8f0;
      margin: 25px 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f1f5f9;
    }
    
    .section-title::before {
      content: '📍';
      font-size: 24px;
    }
    
    .location-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .location-card {
      background: #f8fafc;
      padding: 20px;
      border-radius: 12px;
      border-left: 4px solid #3b82f6;
    }
    
    .location-card h4 {
      color: #1e3a8a;
      margin-bottom: 10px;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .location-card p {
      color: #475569;
      line-height: 1.5;
    }
    
    .virtual-meeting {
      background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
      padding: 25px;
      border-radius: 12px;
      text-align: center;
      margin: 20px 0;
      border: 2px dashed #10b981;
    }
    
    .meeting-link {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 15px 35px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      margin: 15px 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      font-size: 16px;
    }
    
    .meeting-link:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
    
    .reminder-section {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 25px;
      border-radius: 16px;
      border-left: 5px solid #f59e0b;
      margin: 25px 0;
    }
    
    .reminder-list {
      list-style: none;
      padding: 0;
    }
    
    .reminder-list li {
      padding: 10px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 500;
    }
    
    .reminder-list li::before {
      content: '✅';
      font-size: 16px;
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
      padding: 15px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      font-size: 14px;
    }
    
    .primary-button {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
    
    .primary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
    
    .secondary-button {
      background: white;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }
    
    .secondary-button:hover {
      background: #3b82f6;
      color: white;
      transform: translateY(-2px);
    }
    
    .footer {
      background: #1e293b;
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    
    .footer-logo {
      width: 150px;
      height: auto;
      margin: 0 auto 20px;
      display: block;
      background: white;
      padding: 10px;
      border-radius: 8px;
    }
    
    .social-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 25px 0;
    }
    
    .social-link {
      display: inline-block;
      width: 45px;
      height: 45px;
      background: #374151;
      border-radius: 50%;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 18px;
    }
    
    .social-link:hover {
      background: #3b82f6;
      transform: translateY(-3px);
    }
    
    .contact-info {
      margin: 25px 0;
      font-size: 14px;
      opacity: 0.9;
      line-height: 1.8;
    }
    
    .copyright {
      font-size: 12px;
      opacity: 0.6;
      margin-top: 25px;
      line-height: 1.6;
    }
    
    @media (max-width: 600px) {
      .container {
        border-radius: 10px;
        margin: 10px;
      }
      
      .header {
        padding: 30px 20px;
      }
      
      .logo {
        width: 180px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .content {
        padding: 25px 20px;
      }
      
      .detail-grid {
        grid-template-columns: 1fr;
      }
      
      .location-details {
        grid-template-columns: 1fr;
      }
      
      .action-buttons {
        grid-template-columns: 1fr;
      }
      
      .footer-logo {
        width: 120px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section with Full Size Logo -->
    <div class="header">
      <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance Cabinetry" class="logo">
      <h1>Appointment Confirmed! 🎉</h1>
      <p>Your consultation with Laminance Cabinetry is scheduled</p>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <div class="greeting">
        Hello <strong>${appointment.userName}</strong>,
      </div>
      
      <p style="margin-bottom: 25px; color: #64748b;">
        Thank you for choosing Laminance Cabinetry! We're excited to help bring your vision to life. 
        Your appointment details are confirmed below:
      </p>
      
      <!-- Appointment Card -->
      <div class="appointment-card">
        <div class="appointment-title">${appointment.title}</div>
        
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-icon">📅</div>
            <div class="detail-content">
              <div class="detail-label">Date</div>
              <div class="detail-value">${new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">⏰</div>
            <div class="detail-content">
              <div class="detail-label">Time</div>
              <div class="detail-value">${formatTimeForEmail(appointment.time)} - ${calculateEndTime(appointment.time, appointment.duration)}</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">⏱️</div>
            <div class="detail-content">
              <div class="detail-label">Duration</div>
              <div class="detail-value">${appointment.duration} minutes</div>
            </div>
          </div>
          
          ${appointment.phone ? `
          <div class="detail-item">
            <div class="detail-icon">📞</div>
            <div class="detail-content">
              <div class="detail-label">Contact</div>
              <div class="detail-value">${appointment.phone}</div>
            </div>
          </div>
          ` : ''}
        </div>
        
        ${appointment.description ? `
        <div class="detail-item">
          <div class="detail-icon">📝</div>
          <div class="detail-content">
            <div class="detail-label">Description</div>
            <div class="detail-value">${appointment.description}</div>
          </div>
        </div>
        ` : ''}
      </div>
      
      <!-- Enhanced Location Information -->
      <div class="location-section">
        <div class="section-title">Location & Meeting Details</div>
        
        <div class="location-details">
          <div class="location-card">
            <h4>🏢 Appointment Type</h4>
            <p><strong>${appointment.locationType.charAt(0).toUpperCase() + appointment.locationType.slice(1)} Consultation</strong></p>
            <p style="margin-top: 8px; font-size: 14px; color: #64748b;">
              ${appointment.locationType === 'virtual' ? 'Online video consultation' : 
                appointment.locationType === 'office' ? 'In-office meeting' :
                appointment.locationType === 'showroom' ? 'Showroom visit' :
                appointment.locationType === 'client-site' ? 'On-site consultation' : 'Professional consultation'}
            </p>
          </div>
          
          ${appointment.location ? `
          <div class="location-card">
            <h4>📍 Location Name</h4>
            <p>${appointment.location}</p>
          </div>
          ` : ''}
        </div>

        ${appointment.address && appointment.address.street ? `
        <div style="margin-top: 20px; padding: 20px; background: #f1f5f9; border-radius: 12px;">
          <h4 style="color: #1e3a8a; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">🏠 Complete Address</h4>
          <div style="line-height: 1.6; color: #475569;">
            <div><strong>Street:</strong> ${appointment.address.street}</div>
            <div><strong>City:</strong> ${appointment.address.city}</div>
            <div><strong>State:</strong> ${appointment.address.state}</div>
            <div><strong>ZIP Code:</strong> ${appointment.address.zipCode}</div>
            ${appointment.address.country ? `<div><strong>Country:</strong> ${appointment.address.country}</div>` : ''}
          </div>
        </div>
        ` : ''}
        
        ${appointment.locationType === 'virtual' && appointment.virtualMeetingLink ? `
        <div class="virtual-meeting">
          <div class="section-title" style="color: #065f46; border: none; padding: 0; margin-bottom: 15px;">🎥 Virtual Meeting</div>
          <p style="margin-bottom: 15px; color: #047857; font-size: 15px;">Click the button below to join your virtual consultation:</p>
          <a href="${appointment.virtualMeetingLink}" class="meeting-link">
            🚀 Join Virtual Meeting
          </a>
          <p style="font-size: 13px; color: #059669; margin-top: 10px; line-height: 1.5;">
            <strong>Important:</strong> The meeting link will be active 10 minutes before your scheduled time.<br>
            Please test your audio and video setup in advance.
          </p>
        </div>
        ` : ''}

        ${appointment.locationNotes ? `
        <div style="margin-top: 20px; padding: 20px; background: #f0f9ff; border-radius: 12px; border-left: 4px solid #0ea5e9;">
          <h4 style="color: #0369a1; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">💡 Additional Notes</h4>
          <p style="color: #475569; line-height: 1.6;">${appointment.locationNotes}</p>
        </div>
        ` : ''}
      </div>

      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <a href="tel:(862) 450-6069" class="action-button primary-button">
          📞 Call Us Now
        </a>
        <a href="mailto:Contactus@laminance.com" class="action-button secondary-button">
          ✉️ Email Inquiry
        </a>
        <a href="https://laminance.com" class="action-button secondary-button">
          🌐 Visit Website
        </a>
      </div>
      
      <!-- Closing Message -->
      <div style="text-align: center; margin-top: 30px; padding: 30px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; border: 2px solid #e2e8f0;">
        <h3 style="color: #1e3a8a; margin-bottom: 15px; font-size: 22px;">We're Excited to Work With You! 🛠️</h3>
        <p style="color: #475569; margin-bottom: 0; font-size: 15px; line-height: 1.6;">
          Our team at Laminance Cabinetry is dedicated to creating beautiful, functional spaces 
          that exceed your expectations. We look forward to helping you transform your space into something extraordinary!
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div style="margin-bottom: 25px;">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance Cabinetry" class="footer-logo">
        <h3 style="color: white; margin-bottom: 10px; font-size: 20px;">Laminance Cabinetry</h3>
        <p style="opacity: 0.9; margin-bottom: 20px; font-size: 15px;">Crafting Your Dream Spaces with Precision and Care</p>
      </div>
      
      
      <div class="contact-info">
        <p>📞 <strong>(862) 450-6069</strong></p>
        <p>✉️ <strong>Contactus@laminance.com</strong></p>
        <p>🏢 <strong>418 Rt 23, Franklin, NJ 07416</strong></p>
        <p style="margin-top: 10px; font-size: 13px; opacity: 0.8;">
          Showroom Hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM
        </p>
      </div>
      
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.</p>
        <p>This is an automated confirmation email. Please do not reply to this message.</p>
        <p>If you have any questions, please contact us at Contactus@laminance.com</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

    const emailData = await sendEmail({
      sendTo: appointment.email,
      subject: `🎉 Appointment Confirmed: ${appointment.title} - Laminance Cabinetry`,
      html: htmlContent,
    });

    console.log("✅ Appointment email sent successfully to:", appointment.email);
    return { success: true, data: emailData };

  } catch (error) {
    console.error("❌ Error sending appointment email:", error);
    throw new Error(`Failed to send appointment email: ${error.message}`);
  }
};

// Test function with enhanced template
export const testAppointmentEmail = async () => {
  try {
    const testAppointment = {
      userName: "Sarah Johnson",
      email: "sarah@example.com", // Change to a real email for testing
      title: "Kitchen Cabinetry Design Consultation",
      date: "2024-01-15",
      time: "14:00",
      duration: 90,
      description: "Initial consultation for new kitchen cabinetry design including measurements, material selection, and budget discussion.",
      phone: "(862) 450-6069",
      locationType: "showroom",
      location: "Laminance Cabinetry Showroom",
      address: {
        street: "418 Rt 23",
        city: "Franklin",
        state: "NJ",
        zipCode: "07416",
        country: "USA"
      },
      locationNotes: "Parking available in the rear lot. Look for the blue Laminance sign. Our showroom is located on the first floor.",
      virtualMeetingLink: ""
    };

    const result = await sendAppointmentEmail(testAppointment);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default sendEmail;