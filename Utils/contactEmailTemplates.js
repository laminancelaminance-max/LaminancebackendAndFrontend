// File: Utils/contactEmailTemplates.js

// Admin email template for contact form submissions

export const getAdminContactEmailTemplate = (contactData) => {
  const { 
    name, 
    email, 
    phone, 
    address = {}, 
    subject, 
    message,
    preferredDate,
    preferredTime,
    originalPreferredDate,
    originalPreferredTime,
    submissionDate,
    submissionTime,
    submissionDateTime,
    reference,
    ipAddress
  } = contactData;

  // Format address
  const formatAddress = () => {
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
      address.country
    ].filter(Boolean);

    return parts.length ? parts.join(', ') : 'Not provided';
  };

  // Preferred consultation
  const getPreferredConsultation = () => {
    const date = preferredDate?.formatted || preferredDate || null;
    const time = preferredTime && preferredTime !== 'Not specified' ? preferredTime : null;
    return { date, time };
  };

  // Submission time
  const getSubmissionInfo = () => {
    const dateObj = submissionDateTime ? new Date(submissionDateTime) : new Date();
    return {
      date: submissionDate || dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: submissionTime || dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const formattedAddress = formatAddress();
  const preferredConsultation = getPreferredConsultation();
  const submission = getSubmissionInfo();
  const inquiryRef =
    reference || `LC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Laminance Cabinetry Inquiry</title>

<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    font-family: Arial, Helvetica, sans-serif;
    color: #334155;
  }

  table {
    border-collapse: collapse;
  }

  .main {
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
  }

  .header {
    background: #0f172a;
    padding: 32px;
    color: #ffffff;
  }

  .content {
    padding: 32px;
  }

  .section-title {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #94a3b8;
    margin-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 6px;
  }

  .card {
    border: 1px solid #f1f5f9;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
  }

  .label {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .value {
    font-size: 15px;
    color: #1e293b;
    font-weight: 500;
    word-break: break-word;
    text-decoration: none !important;
  }

  .message-box {
    background: #f8fafc;
    border-left: 4px solid #3b82f6;
    padding: 16px;
    font-style: italic;
    line-height: 1.6;
    color: #475569;
    word-break: break-word;
  }

  .footer {
    padding: 24px;
    font-size: 12px;
    color: #94a3b8;
    text-align: center;
    border-top: 1px solid #f1f5f9;
  }
</style>
</head>

<body>
<table width="100%">
<tr>
<td align="center">

<table class="main" width="100%">

<tr>
<td class="header">
  <img
    src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png"
    width="140"
    alt="Laminance"
    style="display:block;margin-bottom:16px;filter:brightness(0) invert(1);" />
  <h2 style="margin:0;">Project Inquiry</h2>
  <p style="margin:6px 0 0;color:#94a3b8;">
    Reference ID: ${inquiryRef}
  </p>
</td>
</tr>

<tr>
<td class="content">

  <div class="section-title">Customer Dossier</div>
  <div class="card">

    <div class="label">Full Name</div>
    <div class="value">${name || 'Laminance Cabinetry'}</div>

    <br />

    <div class="label">Email Contact</div>
    <div class="value">${email || 'Not provided'}</div>

    <br />

    <div class="label">Phone Number</div>
    <div class="value">${phone || 'Not provided'}</div>

    <br />

    <div class="label">Project Location</div>
    <div class="value">${formattedAddress}</div>

  </div>

  <div class="section-title">Consultation Logistics</div>
  <div class="card">

    <div class="label">Preferred Date</div>
    <div class="value">${preferredConsultation.date || 'Not specified'}</div>

    <br />

    <div class="label">Preferred Time</div>
    <div class="value">${preferredConsultation.time || 'Not specified'}</div>

    ${
      originalPreferredDate || originalPreferredTime
        ? `
          <br />
          <div class="label">Original Input</div>
          <div class="value" style="font-size:13px;color:#64748b;">
            ${originalPreferredDate || ''} ${originalPreferredTime || ''}
          </div>
        `
        : ''
    }

  </div>

  <div class="section-title">Inquiry Context</div>
  <div class="label">Subject</div>
  <div class="value" style="font-weight:700;">
    ${subject || 'General Inquiry'}
  </div>

  <br />

  <div class="message-box">
    ${message ? message.replace(/\n/g, '<br />') : 'No message provided'}
  </div>

</td>
</tr>

<tr>
<td class="footer">
  Submitted on ${submission.date} at ${submission.time}
  from IP: ${ipAddress || 'Not available'}<br />
  © ${new Date().getFullYear()} Laminance Cabinetry Studio
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
};



// User confirmation email template
export const getUserContactEmailTemplate = (contactData) => {
  const { 
    name, 
    email, 
    subject, 
    message,
    phone,
    preferredDate,
    preferredTime,
    submissionDateTime 
  } = contactData;
  
  // Helper function to format submission date
  const getSubmissionInfo = () => {
    try {
      let date;
      if (submissionDateTime) {
        date = new Date(submissionDateTime);
      } else {
        date = new Date();
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        date = new Date();
      }
      
      // Format: "Monday, January 15, 2024 at 2:30 PM"
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return date.toLocaleString('en-US', options);
    } catch (error) {
      // Fallback to current date if there's an error
      return new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Helper function to format preferred consultation - FIXED
  const getPreferredConsultation = () => {
    // Extract string values if objects are passed
    let dateStr = preferredDate;
    let timeStr = preferredTime;
    
    // If preferredDate is an object with a formatted property (common pattern)
    if (preferredDate && typeof preferredDate === 'object') {
      dateStr = preferredDate.formatted || preferredDate.original || null;
    }
    
    // If preferredTime is an object, convert to string
    if (preferredTime && typeof preferredTime === 'object') {
      timeStr = preferredTime.toString();
    }
    
    // Clean up "Not specified" values
    if (timeStr === 'Not specified') {
      timeStr = null;
    }
    
    if (dateStr && timeStr) {
      return `${dateStr} at ${timeStr}`;
    } else if (dateStr) {
      return `${dateStr} (Time not specified)`;
    } else if (timeStr) {
      return `Preferred time: ${timeStr}`;
    }
    return null;
  };

  // Helper function to format contact info
  const getContactDisplay = () => {
    const contacts = [];
    if (email) contacts.push(email);
    if (phone) contacts.push(phone);
    return contacts.length > 0 ? contacts.join('<br>') : 'Not provided';
  };

  const submissionInfo = getSubmissionInfo();
  const preferredConsultation = getPreferredConsultation();
  const inquiryId = `LC${Date.now().toString().slice(-8)}`;
  const contactDisplay = getContactDisplay();

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laminance Cabinetry - Inquiry Confirmation</title>
</head>
<body style="margin: 0; padding: 20px 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; background-color: #f0f2f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Inner Wrapper -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
          
          <!-- Elegant Top Border -->
          <tr><td height="6" style="background-color: #d4af37;"></td></tr>

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; background-color: rgba(255,255,255,0.7); text-align: center;">
              <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance" style="height: 50px; margin-bottom: 20px; filter: brightness(0) invert(1);">
              <h1 style="color: #1a2d3b; font-size: 26px; font-weight: 300; letter-spacing: 1px; margin: 0;">THANK YOU</h1>
              <p style="color: #1a2d3b; font-size: 14px; margin-top: 8px; text-transform: uppercase; letter-spacing: 2px;">Inquiry Received</p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h2 style="color: #1a2d3b; font-size: 20px; margin-top: 0; font-weight: 600;">Dear ${name || 'Valued Customer'},</h2>
              <p style="color: #4b5563; font-size: 16px;">
                We are delighted that you've chosen to reach out to <strong>Laminance Cabinetry</strong>. Our team is currently reviewing your request for cabinetry expertise.
              </p>
            </td>
          </tr>

          <!-- Details Card -->
          <tr>
            <td style="padding: 0 40px 20px;">
              <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50%" style="padding-bottom: 20px;">
                          <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Inquiry ID</div>
                          <div style="font-size: 14px; font-weight: 600; color: #1a2d3b;">${inquiryId}</div>
                        </td>
                        <td width="50%" style="padding-bottom: 20px;">
                          <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Subject</div>
                          <div style="font-size: 14px; font-weight: 600; color: #1a2d3b;">${subject || 'General Inquiry'}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Submitted On</div>
                          <div style="font-size: 13px; color: #1e293b; word-wrap: break-word;">${submissionInfo}</div>
                        </td>
                        <td style="padding-bottom: 20px;">
                          <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Contact Info</div>
                          <div style="font-size: 13px; color: #1e293b; word-wrap: break-word;">${contactDisplay}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Section -->
          ${message ? `
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="padding: 20px; border-left: 4px solid #d4af37; background-color: #fffaf0; border-radius: 4px;">
                <div style="font-size: 12px; color: #92400e; font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Your Message Preview</div>
                <div style="font-style: italic; color: #451a03; line-height: 1.6; word-wrap: break-word;">"${message.replace(/"/g, '&quot;')}"</div>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Appointment Slot -->
          ${preferredConsultation ? `
          <tr>
            <td style="padding: 0 40px 30px;">
              <table width="100%" cellpadding="20" cellspacing="0" border="0" style="background-color: #1a2d3b; border-radius: 8px;">
                <tr>
                  <td align="center">
                    <span style="font-size: 13px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 1.5px;">Requested Consultation Time</span>
                    <div style="color: #ffffff; font-size: 18px; font-weight: 600; margin-top: 8px; word-wrap: break-word;">${preferredConsultation}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Next Steps -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="color: #1a2d3b; font-size: 16px; margin-top: 0;">Our Next Steps</h3>
              <ul style="padding-left: 20px; color: #64748b; font-size: 14px; margin-bottom: 0;">
                <li style="margin-bottom: 8px;">A design specialist will analyze your message within 24 hours.</li>
                <li style="margin-bottom: 8px;">We'll reach out to confirm your preferred consultation time.</li>
                <li>You will receive a tailored proposal based on our initial discussion.</li>
              </ul>
            </td>
          </tr>

          <!-- Footer Branding -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 40px; text-align: center;">
              <img src="https://res.cloudinary.com/dbelveonz/image/upload/v1763586727/logoimg_i3npds.png" alt="Laminance" style="height: 35px; margin-bottom: 15px; opacity: 0.8;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0 0 20px; word-wrap: break-word;">
                418 Rt 23, Franklin, NJ 07416<br>
                (862) 450-6069 | contactus@laminance.com
              </p>
              <table align="center" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://www.laminance.com" style="color: #1a2d3b; font-size: 12px; font-weight: 600; text-decoration: none;">VISIT WEBSITE</a>
                  </td>
                  <td style="padding: 0 10px; color: #cbd5e1;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://maps.google.com/?q=418+Rt+23+Franklin+NJ+07416" style="color: #1a2d3b; font-size: 12px; font-weight: 600; text-decoration: none;">DIRECTIONS</a>
                  </td>
                </tr>
              </table>
              <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 11px; color: #cbd5e1; word-wrap: break-word;">
                © ${new Date().getFullYear()} Laminance Cabinetry. Precision • Craftsmanship • Elegance
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};