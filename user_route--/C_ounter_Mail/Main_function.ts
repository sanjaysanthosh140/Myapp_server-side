const pdfDoc = require("html-pdf");  // html to pdf conversion npm
import { html_doc, html_doc_pdf } from "./Html_doc_format"; //  html docuent format 
//import { transporter } from "./Mail_instr";  // instance of nodemailer transporter
require('dotenv').config()
const Resend = require('resend')
const resend = new Resend(process.env.render_key)
export const counter_mail = async (mail_name: any) => {
  console.log("mail_name  mail function called ",mail_name);
  let { email, name } = mail_name;
  const generate_pdf = async (content: string) => {
    try {
      return new Promise((resolve: any, reject: any) => {
        pdfDoc.create(content).toBuffer((err: Error, buffer: Buffer) => {
          !err ? resolve(buffer) : console.log(err);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (email || name) {
    generate_pdf(html_doc_pdf).then(async (data: any) => {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Welcome to the Future, ${name}! Your AI Journey Begins Here`,
          html: html_doc,
          attachments: [
            {
              filename: "AI-User-Guide.pdf",
              content: data,
              contentType: "application/pdf",
            },
          ],
        };
        const info = await resend.emails.send(mailOptions);
      } catch (error) {
        console.log(error);
      }
    });

  }

};
