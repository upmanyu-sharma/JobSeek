const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "jobhelpnotifications@gmail.com",
    pass: "iifrqgldrpxojlrt",
  },
});

// async function MailSend(to, subject, text, html) {
//   const info = await transporter.sendMail({
//     from: "jobhelpnotifications@gmail.com", // sender address
//     to, // list of receivers
//     subject, // Subject line
//     text, // plain text body
//     html, // html body
//   });
// }

module.exports = { MailSend };
