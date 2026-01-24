// import { Resend } from "resend";
// import dotenv from "dotenv";
// dotenv.config();

// if (!process.env.RESEND_API_KEY) {
//   throw new Error("Missing Resend API Key in environment variables");
// }

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async ({ sendTo, subject, html }) => {
//   try {
//     const data = await resend.emails.send({
//       from: "contactus@laminance.com", // must match verified domain
//       to: sendTo,
//       subject,
//       html,
//     });
//     console.log("Email sent successfully:", data);
//     return data;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// export default sendEmail;


import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing Resend API Key in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using Resend
 * @param {Object} params
 * @param {string|string[]} params.sendTo - Recipient email or array of emails
 * @param {string} params.subject - Email subject
 * @param {string} params.html - HTML content
 */
const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    // ✅ Required field checks
    if (!sendTo) throw new Error("sendTo is required");
    if (!subject) throw new Error("subject is required");
    if (!html) throw new Error("html content is required");

    // ✅ Convert sendTo to array if single string
    const recipients = Array.isArray(sendTo) ? sendTo : [sendTo];

    const data = await resend.emails.send({
      from: "Laminance Cabinetry <contactus@laminance.com>", // verified domain
      to: recipients,
      subject,
      html,
      reply_to: "contactus@laminance.com", // replies go back to your Gmail
    });

    console.log("✅ Email sent successfully:", data?.data?.id || data);
    return data;
  } catch (error) {
    console.error("❌ Error sending email:", error.message || error);
    throw error;
  }
};

export default sendEmail;

