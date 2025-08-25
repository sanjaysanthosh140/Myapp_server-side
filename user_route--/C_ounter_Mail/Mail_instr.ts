const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth:{
    user: process.env.Email_user,
    pass: process.env.Email_pass
   }
});
export {transporter}