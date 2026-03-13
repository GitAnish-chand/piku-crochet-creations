const nodemailer = require('nodemailer');

const sendResetEmail = async (toEmail, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `'Piku Crochet' <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset Your Piku Crochet Admin Password',
    html: `
      <div style='font-family:Arial,sans-serif;max-width:520px;margin:auto;'>
        <h2 style='color:#C2185B;'>Piku Crochet</h2>
        <p>You requested a password reset for your admin account.</p>
        <a href='${resetUrl}'
           style='background:#C2185B;color:#fff;padding:12px 24px;
                  text-decoration:none;border-radius:6px;display:inline-block;'>
          Reset Password
        </a>
        <p style='color:#888;font-size:13px;margin-top:24px;'>
          This link expires in 1 hour. If you did not request this, ignore this email.
        </p>
      </div>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
