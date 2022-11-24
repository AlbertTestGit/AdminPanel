import nodemailer from 'nodemailer';


class MailerService {
    async sendOTP(name, email, password) {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `Node JS Mailer Service <${process.env.MAIL}>`,
            to: email,
            subject: 'Sending Email using Node.js',
            html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <p style="font-size:1.1em">Hi, ${name}</p>
              <p>Use the following OTP to complete your Sign Up procedures</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${password}</h2>
            </div>
          </div>`
        };

        await transporter.sendMail(mailOptions);
    }
}

export default new MailerService();
