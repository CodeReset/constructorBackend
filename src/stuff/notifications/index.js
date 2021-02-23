import nodemailer from 'nodemailer';
import { emailConfig } from '../../../config/email';
import verifyEmail from './templates/verifyMail'

class NotificationService {
  constructor() {
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.email_name,
        pass: emailConfig.secret_key
      }
    });
  }

  async sendEmail(email, template, subject, params) {
    const mailOptions = {
      from: emailConfig.email_name,
      to: email,
      subject,
      html: await this.getTemplate(template, params)
    };
    return await this.emailTransporter.sendMail(mailOptions);
  }

  async getTemplate(template, params) {
    let outputHtml;
    switch (template) {
      case 'verify-email':
        outputHtml = verifyEmail(params);
        break;
      default:
        outputHtml = '';
        break;
    }
    return outputHtml;
  }
}

export default new NotificationService();
