require("dotenv").config();
const nodemailer = require('nodemailer');

export default class Mail{
    transporter: any;

    constructor(){
        this.transporter = nodemailer.createTransport({
            port: process.env.EMAIL_PORT,
            host: process.env.EMAIL_SMTP,
            auth:{
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            secure: true
        });
    }

    async sendEmail(to: string, subject: string, html: string){
        const data = {
            from: process.env.EMAIL,
            to,
            subject,
            html
        }

        try {
            return  await this.transporter.sendEmail(data);
        } catch (err) {
            throw err;
        }
    }
}


