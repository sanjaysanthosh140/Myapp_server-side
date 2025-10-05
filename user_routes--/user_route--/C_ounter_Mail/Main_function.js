"use strict";
// const pdfDoc = require("html-pdf");
// import { html_doc, html_doc_pdf } from "./Html_doc_format";
// require("dotenv").config();
// import { Resend } from "resend";
// // Initialize Resend with correct environment variable name
// const resend = new Resend(process.env.RESEND_API_KEY); // Changed from render_key
// export const counter_mail = async (mail_name: any) => {
//   console.log("mail function called", mail_name);
//   let { email, name } = mail_name;
//   const generate_pdf = async (content: string) => {
//     try {
//       return new Promise((resolve: any, reject: any) => {
//         pdfDoc.create(content).toBuffer((err: Error, buffer: Buffer) => {
//           !err ? resolve(buffer) : reject(err);
//         });
//       });
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };
//   if (email && name) {
//     try {
//       // Generate PDF first
//       const pdfBuffer:any = await generate_pdf(html_doc_pdf);
//       // Convert buffer to base64 for Resend
//       const pdfBase64 = pdfBuffer.toString('base64');
//       // Resend email format (DIFFERENT from Nodemailer!)
//       const { data, error } = await resend.emails.send({
//         from: 'sanjaykrishna038@gmail.com', // Required field
//         to: email,
//         subject: `Welcome to the Future, ${name}! Your AI Journey Begins Here`,
//         html: html_doc,
//         attachments: [
//           {
//             filename: "AI-User-Guide.pdf",
//             content: pdfBase64, // Resend uses base64, not buffer
//           },
//         ],
//       });
//       if (error) {
//         console.log('Resend error:', error);
//         return { success: false, error: error.message };
//       }
//       console.log('✅ Email sent successfully:', data);
//       return { success: true, data: data };
//     } catch (error:any) {
//       console.log('Email failed:', error);
//       return { success: false, error: error.message };
//     }
//   }
// };
