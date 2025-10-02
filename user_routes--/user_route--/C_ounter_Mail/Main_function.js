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
const pdfDoc = require("html-pdf"); // html to pdf conversion npm
const Html_doc_format_1 = require("./Html_doc_format"); //  html docuent format 
//import { transporter } from "./Mail_instr";  // instance of nodemailer transporter
require('dotenv').config();
const resend_1 = require("resend");
const resend = new resend_1.Resend(process.env.render_key);
const counter_mail = (mail_name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("mail_name  mail function called ", mail_name);
    let { email, name } = mail_name;
    const generate_pdf = (content) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return new Promise((resolve, reject) => {
                pdfDoc.create(content).toBuffer((err, buffer) => {
                    !err ? resolve(buffer) : console.log(err);
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    if (email || name) {
        generate_pdf(Html_doc_format_1.html_doc_pdf).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: `Welcome to the Future, ${name}! Your AI Journey Begins Here`,
                    html: Html_doc_format_1.html_doc,
                    attachments: [
                        {
                            filename: "AI-User-Guide.pdf",
                            content: data,
                            contentType: "application/pdf",
                        },
                    ],
                };
                const info = yield resend.emails.send(mailOptions);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.counter_mail = counter_mail;
