const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);
const msg = (email, verificationToken) => {
  return {
    to: `${email}`, // Change to your recipient
    from: "artur.krasniewski1@gmail.com", // Change to your verified sender
    subject: "ContactBook by Artur User Verification",
    text: `To verify Your account at ContactBook by Artur just click link below http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<strong>To verify Your account at ContactBook by Artur just click link below <br/> <a href="http://localhost:3000/api/users/verify/${verificationToken}">VERIFICATION LINK<a/></strong>`,
  };
};

const sendMail = (email, verificationToken) => {
  sgMail
    .send(msg(email, verificationToken))
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { sendMail };
