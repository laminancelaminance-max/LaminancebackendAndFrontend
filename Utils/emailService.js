import { Resend } from "resend";
import dotenv from "dotenv";
import { getAppointmentEmailTemplate } from "./emailTemplate.js";

// Load environment variables
dotenv.config();

// Debug logging
console.log('=== EMAIL SERVICE INITIALIZATION ===');
console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.error('❌ CRITICAL ERROR: Missing Resend API Key in environment variables');
  throw new Error("Missing Resend API Key in environment variables");
}

console.log('✅ Resend API Key loaded successfully');
console.log('Key starts with:', process.env.RESEND_API_KEY.substring(0, 10));

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
console.log('✅ Resend initialized');

// Generic sendEmail function
export const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    console.log('📧 SENDING EMAIL:', {
      to: sendTo,
      subject: subject,
      from: "Laminance Cabinetry <contactus@contact.laminance.com>"
    });

    const data = await resend.emails.send({
      from: "Laminance Cabinetry <contactus@contact.laminance.com>",
      replyTo: "contactus@laminance.com",
      to: sendTo,
      subject: subject,
      html: html, 
    });
    
    console.log("✅ Email sent successfully. Message ID:", data.id);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:");
    console.error("Error message:", error.message);
    console.error("Error details:", error);
    
    // Check for specific error types
    if (error.message.includes("401")) {
      console.error("🔑 401 Error: Invalid or missing API key");
      console.error("Current API key prefix:", process.env.RESEND_API_KEY?.substring(0, 10));
    }
    
    throw error;
  }
};

// Format time helper function
const formatTimeForEmail = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Calculate end time helper function
const calculateEndTime = (startTime, duration) => {
  const [hours, minutes] = startTime.split(':');
  const startDate = new Date();
  startDate.setHours(parseInt(hours), parseInt(minutes));
  const endDate = new Date(startDate.getTime() + duration * 60000);
  return formatTimeForEmail(endDate.toTimeString().slice(0, 5));
};

// Function to send appointment email
export const sendAppointmentEmail = async (appointment) => {
  try {
    console.log('📅 SENDING APPOINTMENT EMAIL TO:', appointment.email);
    
    // Generate the HTML content using the template
    const htmlContent = getAppointmentEmailTemplate({
      appointment,
      formatTimeForEmail,
      calculateEndTime
    });

    const emailData = await sendEmail({
      sendTo: appointment.email,
      subject: `✨ Appointment Confirmed: ${appointment.title} - Laminance Cabinetry`,
      html: htmlContent,
    });

    console.log("✅ Appointment email sent successfully to:", appointment.email);
    return { success: true, data: emailData };

  } catch (error) {
    console.error("❌ Error sending appointment email:", error.message);
    throw new Error(`Failed to send appointment email: ${error.message}`);
  }
};

// Test function
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

    console.log('🧪 TESTING APPOINTMENT EMAIL FUNCTION...');
    const result = await sendAppointmentEmail(testAppointment);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Email template helper functions (now ES Module exports)
export const generateAdminEmail = (contactData) => {
  // ... your existing generateAdminEmail function code ...
  return `...`; // Your existing template
};

export const generateUserEmail = (contactData) => {
  // ... your existing generateUserEmail function code ...
  return `...`; // Your existing template
};
