const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");




const sendEmail = async (email, subject, payload) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: subject,
      html: `<h1>Hi ${payload.name}</h1><p>Click on the link below to reset your password</p><a style='color: blue;' href='https://${payload.link}'>Reset Password</a>`
    }, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(info)
      }
    })
  } catch (error) {
    console.log(error)
  }
}


// const sendEmail = async (email, subject, payload, template) => {
//   try {
//     // create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: 587,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
//       },
//     });

//     const source = fs.readFileSync(path.join(__dirname, template), "utf8");
//     const compiledTemplate = handlebars.compile(source);
//     const options = () => {
//       return {
//         from: process.env.FROM_EMAIL,
//         to: email,
//         subject: subject,
//         html: compiledTemplate(payload),
//       };
//     };

//     // Send email
//     transporter.sendMail(options(), (error, info) => {
//       if (error) {
//         return error;
//       } else {
//         return res.status(200).json({
//           success: true,
//         });
//       }
//     });
//   } catch (error) {
//     return error;
//   }
// };

/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;