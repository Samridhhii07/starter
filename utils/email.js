const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //Cretae a transporter
    const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        },
    })
         //Define the email options
         const mailOptions ={
from:'Jonas schmedtmann <admin@test.io>',
to:options.email,
subject: options.subject,
text:options.message
         };
//Actually send the mail
    await transporter.sendMail(mailOptions);
   
};

module.exports = sendEmail;