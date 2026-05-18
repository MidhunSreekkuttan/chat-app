import sendingMaile from "../nodeMailer.js";

function forgetPasswordOtp(otp, to) {

    const html = `

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:40px 0;">

        <table width="500" cellpadding="0" cellspacing="0" border="0"
          style="background:#ffffff; border-radius:10px; padding:40px;">

          <tr>
            <td align="center">
              <h2 style="color:#333333; margin-bottom:20px;">
                Password Reset OTP
              </h2>

              <p style="color:#666666; font-size:16px; line-height:24px;">
                We received a request to reset your password.
              </p>

              <p style="color:#666666; font-size:16px; line-height:24px;">
                Use the OTP below to continue:
              </p>

              <div style="
                margin:30px 0;
                font-size:32px;
                font-weight:bold;
                letter-spacing:8px;
                color:#007bff;
              ">
                ${otp}
              </div>

              <p style="color:#999999; font-size:14px; line-height:22px;">
                This OTP is valid for 10 minutes.
              </p>

              <p style="color:#999999; font-size:14px; line-height:22px;">
                If you did not request a password reset, you can ignore this email.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>

`
    return sendingMaile.sendMail({
        from: `"Chat App" <${process.env.NO_REPLAY_EMAIL}>`,
        to,
        subject: "Reset Password Using OTP",
        html
    })

}

export default forgetPasswordOtp