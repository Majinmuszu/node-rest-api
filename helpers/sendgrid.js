const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);
// const msg = {
//   to: "majin.muszu@gmail.com", // Change to your recipient
//   from: "artur.krasniewski1@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
const sendMail = (email, verificationToken) => {
  sgMail
    .send({
        to: `${email}`, // Change to your recipient
        from: "artur.krasniewski1@gmail.com", // Change to your verified sender
        subject: "Contact Book User Verification",
        text: `To verify Your account at ContactBook by Artur just click this link localhost:3000/users/verify/${verificationToken}`,
      })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {sendMail}