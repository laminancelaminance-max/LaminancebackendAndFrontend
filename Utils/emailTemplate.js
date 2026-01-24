// Email template function
export const getAppointmentEmailTemplate = ({ 
  appointment, 
  formatTimeForEmail, 
  calculateEndTime 
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - Laminance Cabinetry</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    
    body {
      font-family: 'Inter', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: linear-gradient(135deg, #f8f5f0 0%, #e8e2d6 100%);
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Mobile First Approach */
    .container {
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      background: white;
      overflow: hidden;
      border: 1px solid #e8dcc6;
    }
    
    .header {
      background: linear-gradient(135deg, #2c2416 0%, #1a140a 100%);
      color: #d4b778;
      padding: 30px 20px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
    }
    
    .logo {
      height: 60px;
      width: auto;
      max-width: 100%;
      filter: drop-shadow(0 4px 15px rgba(212, 183, 120, 0.3));
    }
    
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
      color: #f5e9d0;
      letter-spacing: 0.5px;
      line-height: 1.3;
      padding: 0 10px;
    }
    
    .header p {
      font-size: 14px;
      color: #d4b778;
      position: relative;
      z-index: 2;
      font-weight: 400;
      letter-spacing: 1px;
      text-transform: uppercase;
      padding: 0 10px;
    }
    
    .content {
      padding: 30px 20px;
      background: #fffefb;
      width: 100%;
    }
    
    .greeting {
      font-size: 18px;
      color: #2c2416;
      margin-bottom: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      word-break: break-word;
    }
    
    .greeting::before {
      content: '👋';
      font-size: 20px;
      flex-shrink: 0;
    }
    
    .intro-text {
      color: #5a4c30;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f0e9db;
      word-break: break-word;
    }
    
    .appointment-card {
      background: white;
      padding: 25px 20px;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(139, 107, 62, 0.1);
      border: 2px solid #e8dcc6;
      margin-bottom: 25px;
      position: relative;
      overflow: hidden;
      width: 100%;
    }
    
    .appointment-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: linear-gradient(to bottom, #d4b778, #b89446);
    }
    
    .appointment-title {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
      font-weight: 700;
      color: #2c2416;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      word-break: break-word;
    }
    
    .appointment-title::before {
      content: '✨';
      font-size: 24px;
      flex-shrink: 0;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin-bottom: 20px;
      width: 100%;
    }
    
    .detail-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 15px;
      background: #f8f5f0;
      border-radius: 10px;
      border: 1px solid #e8e2d6;
      width: 100%;
      min-width: 0;
    }
    
    .detail-icon {
      width: 22px;
      height: 22px;
      background: #d4b778;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2c2416;
      font-size: 11px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .detail-content {
      flex: 1;
      min-width: 0;
      overflow-wrap: break-word;
      word-break: break-word;
    }
    
    .detail-label {
      font-size: 11px;
      color: #8b7a4e;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
      display: block;
    }
    
    .detail-value {
      font-size: 14px;
      font-weight: 600;
      color: #2c2416;
      line-height: 1.4;
      word-break: break-word;
    }
    
    .description-section {
      background: #f8f5f0;
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
      border-left: 4px solid #d4b778;
      word-break: break-word;
    }
    
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 600;
      color: #2c2416;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e8e2d6;
      flex-wrap: wrap;
    }
    
    .location-section {
      background: linear-gradient(135deg, #f8f5f0 0%, #fffefb 100%);
      padding: 25px 20px;
      border-radius: 12px;
      border: 2px solid #e8dcc6;
      margin: 25px 0;
      position: relative;
      overflow: hidden;
      width: 100%;
    }
    
    .location-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(to right, #d4b778, #b89446);
    }
    
    .location-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    
    .location-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 3px 15px rgba(139, 107, 62, 0.08);
      border: 1px solid #e8e2d6;
      width: 100%;
      word-break: break-word;
    }
    
    .location-card h4 {
      color: #2c2416;
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .location-card p {
      color: #5a4c30;
      line-height: 1.6;
      font-size: 13px;
      word-break: break-word;
    }
    
    .virtual-meeting {
      background: linear-gradient(135deg, #f0f7e8 0%, #e8f4e0 100%);
      padding: 25px 20px;
      border-radius: 10px;
      text-align: center;
      margin: 20px 0;
      border: 2px solid #c5d8a4;
      position: relative;
      width: 100%;
    }
    
    .virtual-meeting::before {
      content: '💻';
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 16px;
      border: 2px solid #c5d8a4;
    }
    
    .meeting-link {
      display: inline-block;
      background: linear-gradient(135deg, #8b6b3c 0%, #6b4f28 100%);
      color: white;
      padding: 14px 30px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      margin: 15px 0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(139, 107, 62, 0.3);
      font-size: 15px;
      letter-spacing: 0.5px;
      word-break: break-word;
      max-width: 100%;
    }
    
    .action-buttons {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      margin: 30px 0;
      width: 100%;
    }
    
    .action-button {
      display: block;
      text-align: center;
      padding: 16px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      word-break: break-word;
    }
    
    .primary-button {
      background: linear-gradient(135deg, #8b6b3c 0%, #6b4f28 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(139, 107, 62, 0.3);
    }
    
    .secondary-button {
      background: white;
      color: #8b6b3c;
      border: 2px solid #d4b778;
    }
    
    .closing-section {
      text-align: center;
      margin-top: 30px;
      padding: 30px 20px;
      background: linear-gradient(135deg, #f8f5f0 0%, #fffefb 100%);
      border-radius: 12px;
      border: 2px solid #e8dcc6;
      position: relative;
      width: 100%;
    }
    
    .closing-section::before {
      content: '🎯';
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 8px 16px;
      border-radius: 50%;
      font-size: 20px;
      border: 3px solid #d4b778;
    }
    
    .closing-section h3 {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      color: #2c2416;
      margin-bottom: 15px;
      line-height: 1.4;
      word-break: break-word;
      padding: 0 10px;
    }
    
    .closing-section p {
      color: #5a4c30;
      font-size: 14px;
      line-height: 1.6;
      word-break: break-word;
      padding: 0 10px;
    }
    
    .footer {
      background: linear-gradient(135deg, #1a140a 0%, #2c2416 100%);
      color: #d4b778;
      padding: 40px 20px;
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
    
    .footer-logo-container {
      margin-bottom: 25px;
      position: relative;
      z-index: 2;
    }
    
    .footer-logo {
      height: 50px;
      width: auto;
      max-width: 100%;
      filter: brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(30deg);
      opacity: 0.9;
    }
    
    .footer-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      color: #f5e9d0;
      margin: 15px 0 8px;
      letter-spacing: 0.5px;
      word-break: break-word;
      padding: 0 10px;
    }
    
    .footer-tagline {
      color: #d4b778;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 25px;
      opacity: 0.8;
      word-break: break-word;
      padding: 0 10px;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin: 25px 0;
      position: relative;
      z-index: 2;
    }
    
    .contact-item {
      text-align: center;
      padding: 15px;
      background: rgba(212, 183, 120, 0.1);
      border-radius: 10px;
      border: 1px solid rgba(212, 183, 120, 0.2);
      word-break: break-word;
    }
    
    .contact-icon {
      font-size: 20px;
      margin-bottom: 8px;
      display: block;
    }
    
    .contact-item strong {
      color: #f5e9d0;
      display: block;
      margin: 5px 0;
      font-size: 15px;
      word-break: break-word;
    }
    
    .contact-item span {
      color: #d4b778;
      font-size: 12px;
      opacity: 0.9;
      word-break: break-word;
    }
    
    .hours-note {
      font-size: 12px;
      color: #d4b778;
      margin-top: 15px;
      opacity: 0.8;
      font-style: italic;
      word-break: break-word;
      padding: 0 10px;
    }
    
    .copyright {
      font-size: 11px;
      color: #8b7a4e;
      margin-top: 30px;
      line-height: 1.6;
      border-top: 1px solid rgba(212, 183, 120, 0.2);
      padding-top: 20px;
      position: relative;
      z-index: 2;
      word-break: break-word;
    }
    
    .copyright p {
      margin-bottom: 10px;
    }
    
    .copyright p:last-child {
      margin-bottom: 0;
    }
    
    /* Tablet Styles */
    @media (min-width: 480px) {
      .container {
        border-radius: 12px;
        margin: 15px auto;
      }
      
      .header {
        padding: 35px 25px;
      }
      
      .header h1 {
        font-size: 26px;
      }
      
      .logo {
        height: 70px;
      }
      
      .content {
        padding: 35px 25px;
      }
      
      .greeting {
        font-size: 20px;
      }
      
      .appointment-card {
        padding: 30px 25px;
      }
      
      .detail-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      
      .location-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .action-buttons {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .contact-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    /* Desktop Styles */
    @media (min-width: 768px) {
      .container {
        border-radius: 20px;
        margin: 20px auto;
        box-shadow: 0 25px 60px rgba(139, 107, 62, 0.15);
      }
      
      .header {
        padding: 40px 30px;
      }
      
      .header h1 {
        font-size: 36px;
      }
      
      .logo {
        height: 80px;
      }
      
      .content {
        padding: 40px 30px;
      }
      
      .greeting {
        font-size: 22px;
      }
      
      .intro-text {
        font-size: 16px;
        line-height: 1.8;
      }
      
      .appointment-card {
        padding: 35px;
        border-radius: 16px;
      }
      
      .appointment-title {
        font-size: 28px;
      }
      
      .appointment-title::before {
        font-size: 32px;
      }
      
      .detail-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
      }
      
      .detail-item {
        padding: 18px;
        border-radius: 12px;
      }
      
      .detail-item:hover {
        background: #f0e9db;
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(139, 107, 62, 0.1);
      }
      
      .detail-icon {
        width: 24px;
        height: 24px;
      }
      
      .detail-label {
        font-size: 12px;
        letter-spacing: 1px;
      }
      
      .detail-value {
        font-size: 15px;
      }
      
      .description-section {
        padding: 25px;
        border-radius: 12px;
      }
      
      .section-title {
        font-size: 22px;
      }
      
      .location-section {
        padding: 35px;
        border-radius: 16px;
      }
      
      .location-grid {
        gap: 25px;
        margin-top: 25px;
      }
      
      .location-card {
        padding: 25px;
        border-radius: 12px;
      }
      
      .location-card:hover {
        transform: translateY(-3px);
      }
      
      .location-card h4 {
        font-size: 16px;
      }
      
      .location-card p {
        font-size: 14px;
      }
      
      .virtual-meeting {
        padding: 30px;
        border-radius: 12px;
      }
      
      .virtual-meeting::before {
        padding: 8px 16px;
        font-size: 18px;
      }
      
      .meeting-link {
        padding: 16px 40px;
        font-size: 16px;
      }
      
      .meeting-link:hover {
        background: linear-gradient(135deg, #6b4f28 0%, #4a361b 100%);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(139, 107, 62, 0.4);
      }
      
      .action-buttons {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 20px;
        margin: 35px 0;
      }
      
      .action-button {
        padding: 18px;
        border-radius: 12px;
        font-size: 15px;
      }
      
      .primary-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(139, 107, 62, 0.4);
      }
      
      .secondary-button:hover {
        background: #f8f5f0;
        color: #6b4f28;
        transform: translateY(-3px);
      }
      
      .closing-section {
        padding: 40px;
        border-radius: 16px;
        margin-top: 40px;
      }
      
      .closing-section h3 {
        font-size: 26px;
      }
      
      .closing-section p {
        font-size: 16px;
        line-height: 1.8;
        max-width: 550px;
        margin: 0 auto;
      }
      
      .footer {
        padding: 50px 30px;
      }
      
      .footer-logo {
        height: 60px;
      }
      
      .footer-title {
        font-size: 24px;
        letter-spacing: 1px;
      }
      
      .footer-tagline {
        font-size: 14px;
        letter-spacing: 2px;
      }
      
      .contact-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 25px;
        margin: 30px 0;
      }
      
      .contact-item {
        padding: 20px;
      }
      
      .contact-icon {
        font-size: 24px;
      }
      
      .contact-item strong {
        font-size: 16px;
      }
      
      .contact-item span {
        font-size: 13px;
      }
      
      .hours-note {
        font-size: 13px;
      }
      
      .copyright {
        font-size: 12px;
        line-height: 1.8;
        margin-top: 40px;
        padding-top: 25px;
      }
    }
    
    /* Email Client Specific Fixes */
    @media screen and (max-width: 480px) {
      table[class="container"] {
        width: 100% !important;
      }
      
      td[class="content"] {
        padding: 20px 15px !important;
      }
      
      td[class="header"] {
        padding: 25px 15px !important;
      }
    }
    
    /* Print Styles */
    @media print {
      body {
        background: white !important;
      }
      
      .container {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
      }
    }
    
    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      body {
        background: #1a1a1a !important;
      }
      
      .container {
        background: #2d2d2d !important;
        color: #ffffff !important;
      }
      
      .content {
        background: #2d2d2d !important;
      }
      
      .appointment-card,
      .location-card {
        background: #3a3a3a !important;
        border-color: #555 !important;
      }
      
      .greeting,
      .appointment-title,
      .section-title,
      .detail-value,
      .closing-section h3 {
        color: #ffffff !important;
      }
      
      .intro-text,
      .location-card p,
      .closing-section p {
        color: #cccccc !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Enhanced Header with Laminance Logo -->
    <div class="header">
      <div class="logo-container">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" 
             alt="Laminance Cabinetry" 
             class="logo">
      </div>
      <h1>Welcome to Laminance Cabinetry!</h1>
      <p>Your Appointment is Confirmed</p>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <div class="greeting">
        Hello <strong>${appointment.userName}</strong>,
      </div>
      
      <div class="intro-text">
        Thank you for choosing <strong>Laminance Cabinetry</strong> for your cabinetry needs. 
        We specialize in creating beautiful, functional spaces with precision craftsmanship 
        and premium materials. Your consultation details are confirmed below:
      </div>
      
      <!-- Appointment Card -->
      <div class="appointment-card">
        <div class="appointment-title">${appointment.title}</div>
        
        <div class="detail-grid">
          <div class="detail-item">
            <div class="detail-icon">📅</div>
            <div class="detail-content">
              <div class="detail-label">Date</div>
              <div class="detail-value">${new Date(appointment.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="detail-icon">⏰</div>
            <div class="detail-content">
              <div class="detail-label">Time</div>
              <div class="detail-value">
                ${formatTimeForEmail(appointment.time)} - ${calculateEndTime(appointment.time, appointment.duration)}
              </div>
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
              <div class="detail-label">Phone Number</div>
              <div class="detail-value">${appointment.phone}</div>
            </div>
          </div>
          ` : ''}
        </div>
        
        ${appointment.description ? `
        <div class="description-section">
          <div class="section-title">
            <span>📋</span> Consultation Details
          </div>
          <div style="color: #5a4c30; line-height: 1.7;">
            ${appointment.description}
          </div>
        </div>
        ` : ''}
      </div>
      
      <!-- Location Information -->
      <div class="location-section">
        <div class="section-title">
          <span>📍</span> Meeting Location & Details
        </div>
        
        <div class="location-grid">
          <div class="location-card">
            <h4>🏢 Appointment Type</h4>
            <p><strong>${appointment.locationType.charAt(0).toUpperCase() + appointment.locationType.slice(1)} Consultation</strong></p>
            <p style="margin-top: 8px; font-size: 13px; color: #8b7a4e;">
              ${appointment.locationType === 'virtual' ? '🔗 Online video consultation via secure link' : 
                appointment.locationType === 'office' ? '🏛️ In-office professional meeting' :
                appointment.locationType === 'showroom' ? '🖼️ Showroom visit with samples display' :
                appointment.locationType === 'client-site' ? '🏠 On-site consultation & measurements' : 
                '👥 Professional consultation'}
            </p>
          </div>
          
          ${appointment.location ? `
          <div class="location-card">
            <h4>📍 Meeting Location</h4>
            <p>${appointment.location}</p>
          </div>
          ` : ''}
        </div>

        ${appointment.address && appointment.address.street ? `
        <div style="margin-top: 25px; padding: 20px; background: white; border-radius: 12px; border: 2px solid #e8dcc6; word-break: break-word;">
          <h4 style="color: #2c2416; margin-bottom: 15px; display: flex; align-items: center; gap: 12px; font-weight: 600;">
            <span>🏠</span> Complete Address
          </h4>
          <div style="display: grid; grid-template-columns: 1fr; gap: 10px; color: #5a4c30;">
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
          <div style="font-size: 20px; color: #2c2416; margin-bottom: 15px; font-weight: 600;">🎥 Virtual Meeting</div>
          <p style="margin-bottom: 20px; color: #5a4c30; font-size: 15px;">
            Join your virtual consultation using the link below:
          </p>
          <a href="${appointment.virtualMeetingLink}" class="meeting-link">
            🔗 Join Virtual Consultation
          </a>
          <div style="font-size: 13px; color: #8b7a4e; margin-top: 20px; line-height: 1.6;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
              <span>💡</span> <strong>Tip:</strong> Test your audio/video setup in advance
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>⏰</span> Link active 10 minutes before scheduled time
            </div>
          </div>
        </div>
        ` : ''}

        ${appointment.locationNotes ? `
        <div style="margin-top: 25px; padding: 20px; background: #f0e9db; border-radius: 12px; border-left: 4px solid #d4b778; word-break: break-word;">
          <h4 style="color: #2c2416; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; font-weight: 600;">
            <span>📝</span> Location Notes
          </h4>
          <p style="color: #5a4c30; line-height: 1.7;">${appointment.locationNotes}</p>
        </div>
        ` : ''}
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <a href="tel:(862) 450-6069" class="action-button primary-button">
          <span>📞</span> Call Us Now
        </a>
        <a href="mailto:Contactus@laminance.com" class="action-button secondary-button">
          <span>✉️</span> Email Inquiry
        </a>
        <a href="https://laminance.com" class="action-button secondary-button">
          <span>🌐</span> Visit Website
        </a>
      </div>
      
      <!-- Closing Message -->
      <div class="closing-section">
        <h3>Crafting Your Dream Space with Precision ✨</h3>
        <p>
          At Laminance Cabinetry, we combine expert craftsmanship with premium materials 
          to create cabinetry that enhances your space and lifestyle. Our team is dedicated 
          to delivering exceptional quality and service from consultation to completion.
        </p>
      </div>
    </div>
    
    <!-- Enhanced Footer -->
    <div class="footer">
      <div class="footer-logo-container">
        <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" 
             alt="Laminance Cabinetry" 
             class="footer-logo">
        <div class="footer-title">Laminance Cabinetry</div>
        <div class="footer-tagline">Precision • Craftsmanship • Elegance</div>
      </div>
      
      <div class="contact-grid">
        <div class="contact-item">
          <span class="contact-icon">📞</span>
          <strong>(862) 450-6069</strong>
          <span>Primary Contact</span>
        </div>
        
        <div class="contact-item">
          <span class="contact-icon">✉️</span>
          <strong>Contactus@laminance.com</strong>
          <span>Email Address</span>
        </div>
        
        <div class="contact-item">
          <span class="contact-icon">🏢</span>
          <strong>418 Rt 23, Franklin, NJ 07416</strong>
          <span>Showroom Location</span>
        </div>
      </div>
      
      <div class="hours-note">
        Showroom Hours: Monday - Friday 9:00 AM - 6:00 PM | Saturday 10:00 AM - 4:00 PM
      </div>
      
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.</p>
        <p>This is an automated confirmation email. For questions, please contact us at Contactus@laminance.com</p>
        <p style="margin-top: 15px; font-size: 11px; opacity: 0.6;">
          Crafting beautiful spaces since 2005
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
};