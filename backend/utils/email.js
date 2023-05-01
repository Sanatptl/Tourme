const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  // 1) create transporter
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2) define mail option
  const mailOption = {
    from: '(sanatpatel@xx.io)',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  // 3) send email to user's mailbox
  await transport.sendMail(mailOption);
};

module.exports = sendEmail;
