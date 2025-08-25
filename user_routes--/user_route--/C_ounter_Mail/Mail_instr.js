"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email_user,
        pass: process.env.Email_pass
    }
});
exports.transporter = transporter;
