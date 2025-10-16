const getEmailTemplate = ({ name, url }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Email Verification</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f9f9f9;">

      <table role="presentation" style="width:100%; border-collapse:collapse; background:#f9f9f9; padding:20px 0;">
        <tr>
          <td align="center">

            <table role="presentation" style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
              
              <!-- Logo -->
              

              <!-- Header -->
              <tr>
                <td style="background:#243a4a; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold; letter-spacing:1px;">
                  Laminance Cabinetry
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px; color:#333333;">
                  <h1 style="margin:0 0 20px; font-size:22px; color:#243a4a;">Hello ${name},</h1>
                  <p style="margin:0 0 15px; font-size:16px; line-height:1.6;">
                    Welcome to <strong>Laminance Cabinetry</strong>! We’re delighted to have you join our community of design and quality enthusiasts.
                  </p>
                  

                  <!-- CTA Button -->
                  

                  <p style="margin:30px 0 0; font-size:14px; color:#666;">
                    If you didn’t create an account with Laminance Cabinetry, you can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f4f4f4; text-align:center; padding:15px; font-size:12px; color:#888;">
                  &copy; ${new Date().getFullYear()} Laminance Cabinetry. All rights reserved.
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>

    </body>
  </html>
  `;
};
export default getEmailTemplate;
