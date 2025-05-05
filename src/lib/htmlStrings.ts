import config from "./config";
import { COMPANY_NAME } from "./constants";

export const signupHtmlString =
  () => `<table style="max-width:600px;margin:auto;font-family:sans-serif;border:1px solid #e0e0e0;padding:20px;">
  <tr>
    <td style="text-align:center;">
      <h2 style="color:#333;">Welcome to ${COMPANY_NAME}</h2>
      <p style="color:#555;font-size:16px;">
        Hello <strong>OMA vendor</strong>,<br><br>
        Thank you for signing up as a vendor. We're excited to have you onboard!<br><br>
        To begin receiving orders through our WhatsApp platform, please complete your business verification.
      </p>
      <a href="${config.env.apiEndpoint}/onboarding" style="display:inline-block;background:#0b5ed7;color:#fff;text-decoration:none;padding:12px 20px;border-radius:5px;margin-top:20px;">
        Apply for Verification
      </a>
      <p style="color:#999;font-size:12px;margin-top:30px;">
        If you have questions, simply reply to this email.
      </p>
    </td>
  </tr>
</table>
`;

export const applyHtmlString = (
  lastName: string
) => `<table style="max-width:600px;margin:auto;font-family:sans-serif;border:1px solid #e0e0e0;padding:20px;">
  <tr>
    <td style="text-align:center;">
      <h2 style="color:#333;">Verification Request Received</h2>
      <p style="color:#555;font-size:16px;">
        Hello <strong>${lastName}</strong>,<br><br>
        We’ve received your request for verification. Our team is reviewing your details.<br>
        You’ll get an update shortly — typically within 24 hours.
      </p>
      <p style="color:#999;font-size:12px;margin-top:30px;">
        Thanks for your patience,<br>The ${COMPANY_NAME} Team
      </p>
    </td>
  </tr>
</table>
`;

export const verifiedHtmlString = (
  lastName: string,
  verificationId: string,
  qrCodeFile: string
) => `<table style="max-width:600px;margin:auto;font-family:sans-serif;border:1px solid #e0e0e0;padding:20px;">
  <tr>
    <td style="text-align:center;">
      <h2 style="color:#28a745;">You're Verified!</h2>
      <p style="color:#555;font-size:16px;">
        Hello <strong>${lastName}</strong>,<br><br>
        Congratulations! Your business is now verified on ${COMPANY_NAME}.
      </p>

      <table style="width:100%;margin:20px 0;background:#f9f9f9;border-radius:8px;">
        <tr>
          <td style="padding:15px;">
            <strong>Business Name:</strong><br>
            ${lastName}
          </td>
        </tr>
        <tr>
          <td style="padding:15px;">
            <strong>Verification Link:</strong><br>
            <a href="${config.env.apiEndpoint}/business/${verificationId}" style="color:#0b5ed7;">Verification Page</a>
          </td>
        </tr>
        <tr>
          <td style="text-align:center;padding:20px;">
            <strong>Scan QR to view your business:</strong><br>
            <img src="${qrCodeFile}" alt="QR Code" style="margin-top:10px;max-width:200px;">
          </td>
        </tr>
      </table>
        <a href="${qrCodeFile}" download style="color:##064d0c;">Download QR code</a>
      <p style="color:#555;">
        Share your link or QR code with customers to receive WhatsApp orders instantly.
      </p>
      <p style="color:#999;font-size:12px;margin-top:30px;">
        Need help? Just reply to this email.
      </p>
    </td>
  </tr>
</table>
`;
