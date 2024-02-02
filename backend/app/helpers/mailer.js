const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD
  }
})

const sendEmail = (from, to, subject, text, callback) => {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error Occurred:", error)
      if (callback) {
        callback(error)
      }
    } else {
      console.log(`Email sent successfully: ${info.response}`)
      if (callback) {
        callback(null, info.response)
      }
    }
  })
}

module.exports = { sendEmail }
