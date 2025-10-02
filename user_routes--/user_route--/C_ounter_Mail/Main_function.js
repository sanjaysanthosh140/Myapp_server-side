"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter_mail = void 0;
const pdfDoc = require("html-pdf");
const Html_doc_format_1 = require("./Html_doc_format");
require("dotenv").config();
const resend_1 = require("resend");
// Initialize Resend with correct environment variable name
const resend = new resend_1.Resend(process.env.RESEND_API_KEY); // Changed from render_key
const counter_mail = (mail_name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("mail function called", mail_name);
    let { email, name } = mail_name;
    const generate_pdf = (content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return new Promise((resolve, reject) => {
                pdfDoc.create(content).toBuffer((err, buffer) => {
                    !err ? resolve(buffer) : reject(err);
                });
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    if (email && name) {
        try {
            // Generate PDF first
            const pdfBuffer = yield generate_pdf(Html_doc_format_1.html_doc_pdf);
            // Convert buffer to base64 for Resend
            const pdfBase64 = pdfBuffer.toString('base64');
            // Resend email format (DIFFERENT from Nodemailer!)
            const { data, error } = yield resend.emails.send({
                from: 'sanjaykrishna038@gmail.com', // Required field
                to: email,
                subject: `Welcome to the Future, ${name}! Your AI Journey Begins Here`,
                html: Html_doc_format_1.html_doc,
                attachments: [
                    {
                        filename: "AI-User-Guide.pdf",
                        content: pdfBase64, // Resend uses base64, not buffer
                    },
                ],
            });
            if (error) {
                console.log('Resend error:', error);
                return { success: false, error: error.message };
            }
            console.log('✅ Email sent successfully:', data);
            return { success: true, data: data };
        }
        catch (error) {
            console.log('Email failed:', error);
            return { success: false, error: error.message };
        }
    }
});
exports.counter_mail = counter_mail;
