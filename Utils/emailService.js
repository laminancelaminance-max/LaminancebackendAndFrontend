import { Resend } from "resend";
import dotenv from "dotenv";
import { getAppointmentEmailTemplate } from "../Utils/emailTemplate.js";

dotenv.config();

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing Resend API Key in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Generic sendEmail function
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Laminance Cabinetry <contactus@laminance.com>",
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
    console.error("❌ Error sending appointment email:", error);
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

    const result = await sendAppointmentEmail(testAppointment);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Export the generic sendEmail function as default
export default sendEmail;