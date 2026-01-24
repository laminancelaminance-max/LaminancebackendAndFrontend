const { Resend } = require("resend");
const { generateAdminEmail, generateUserEmail } = require("../utils/emailTemplates");

class EmailService {
  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    this.resend = new Resend(process.env.RESEND_API_KEY);

    // Default sender
    this.fromEmail = process.env.FROM_EMAIL || "Laminance Cabinetry <contactus@laminance.com>";
  }

  /**
   * Send email to Admin
   */
  async sendAdminEmail(contactData) {
    try {
      if (!process.env.ADMIN_EMAIL) {
        throw new Error("ADMIN_EMAIL is not configured");
      }

      if (!contactData?.email) {
        throw new Error("Sender email is missing in contactData");
      }

      const html = generateAdminEmail(contactData);

      const data = await this.resend.emails.send({
        from: this.fromEmail,
        to: [process.env.ADMIN_EMAIL], // ✅ Always array
        subject: `New Contact Form: ${contactData.subject || "No Subject"}`,
        html,
        reply_to: contactData.email, // Replies go to user
      });

      console.log("✅ Admin email sent:", data?.data?.id || data);
      return { success: true, data };
    } catch (error) {
      console.error("❌ Admin email error:", error.message || error);
      throw error;
    }
  }

  /**
   * Send confirmation email to User
   */
  async sendUserEmail(contactData) {
    try {
      if (!contactData?.email) {
        throw new Error("User email is missing in contactData");
      }

      const html = generateUserEmail(contactData);

      const data = await this.resend.emails.send({
        from: this.fromEmail,
        to: [contactData.email], // ✅ Always array
        subject: `Confirmation: ${contactData.subject || "We received your message"}`,
        html,
        reply_to: this.fromEmail, // Replies go back to contactus@laminance.com
      });

      console.log("✅ User email sent:", data?.data?.id || data);
      return { success: true, data };
    } catch (error) {
      console.error("❌ User email error:", error.message || error);
      throw error;
    }
  }

  /**
   * Send both Admin + User emails
   */
  async sendDualEmails(contactData) {
    const results = {
      adminEmail: null,
      userEmail: null,
      errors: [],
    };

    // Admin email (always)
    try {
      results.adminEmail = await this.sendAdminEmail(contactData);
    } catch (error) {
      results.errors.push(`Admin email failed: ${error.message}`);
    }

    // User email (optional)
    if (contactData?.sendCopy !== false) {
      try {
        results.userEmail = await this.sendUserEmail(contactData);
      } catch (error) {
        results.errors.push(`User email failed: ${error.message}`);
      }
    }

    return results;
  }
}

module.exports = new EmailService();
