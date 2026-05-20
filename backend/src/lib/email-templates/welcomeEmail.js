import sendingMaile from "../nodeMailer.js"

function welcomeMail(name, to) {

  const html = `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome Email</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f7fb;padding:40px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#4f46e5;padding:40px 20px;">
              <h1 style="color:#ffffff;margin:0;font-size:32px;">
                Welcome to Chat App 🚀
              </h1>
              <p style="color:#dbeafe;font-size:16px;margin-top:10px;">
                Connect. Chat. Share instantly.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 35px;color:#333333;">

              <h2 style="margin-top:0;font-size:24px;">
                Hi ${name ? name?.[0]?.toUpperCase() + name?.slice(1) : name}
              </h2>

              <p style="font-size:16px;line-height:1.7;color:#555555;">
                Thanks for joining <strong>Chat App</strong>! We're excited to have you onboard.
              </p>

              <p style="font-size:16px;line-height:1.7;color:#555555;">
                You can now:
              </p>

              <ul style="color:#555555;font-size:16px;line-height:1.8;padding-left:20px;">
                <li>Chat with friends in real-time</li>
                <li>Create private conversations</li>
                <li>Share images and messages instantly</li>
                <li>Stay connected anywhere</li>
              </ul>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:35px auto;">
                <tr>
                  <td align="center" bgcolor="#4f46e5" style="border-radius:8px;">
                    <a href="http://localhost:5100"
                      style="display:inline-block;padding:14px 32px;font-size:16px;color:#ffffff;text-decoration:none;font-weight:bold;">
                      Start Chatting
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px;line-height:1.7;color:#777777;">
                If you have any questions, feel free to reply to this email.
              </p>

              <p style="font-size:15px;color:#777777;margin-top:30px;">
                — The Chat App Team
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb;padding:25px;color:#9ca3af;font-size:13px;">
              © 2026 Chat App. All rights reserved.
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
    subject: "Welcome To Chat App",
    html
  })

}

export default welcomeMail