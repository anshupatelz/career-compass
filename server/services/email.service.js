const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Service for sending emails
class EmailService {

    // Constructor for the EmailService class
    // constructor() {
    //     this.transporter = nodemailer.createTransport({
    //         service: 'Gmail',
    //         auth: {
    //             user: process.env.EMAIL_USER,
    //             pass: process.env.EMAIL_PASS
    //         }
    //     });
    // }
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // Method for sending an email
    async sendEmail(to, subject, templateName, context) {
        const templatePath = path.join(__dirname, '../emails', `${templateName}.ejs`);
        const html = await ejs.renderFile(templatePath, context);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };

        await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();