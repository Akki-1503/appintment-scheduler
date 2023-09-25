const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: 'sushmithasp.murthy@gmail.com',
    pass: 'Sush@0601',
  }
});

// Define the email helper function
const sendEmail = (from, to, subject, text, callback) => {
  // Email content
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error Occurred:", error);
      if (callback) {
        callback(error);
      }
    } else {
      console.log(`Email sent successfully: ${info.response}`);
      if (callback) {
        callback(null, info.response);
      }
    }
  });
};

module.exports = { sendEmail }