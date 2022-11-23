import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
    },
});

class MailerService {
    send(toEmail) {}
}

export default new MailerService();
