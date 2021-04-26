import nodemailer from 'nodemailer';
import { emailConfig } from '../../../config/email';
import verifyEmail from './templates/verifyMail';
import WebSocketService from '../websocket';
import { ACCOUNT_ID, AUTH_TOKEN } from '../../../config/twilio';
import twilio from 'twilio';
// import * as admin from "firebase-admin";

class NotificationService {
  constructor() {
    this.emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.email_name,
        pass: emailConfig.secret_key
      }
    });
    this.webSocketService = WebSocketService;
    this.twilioService = new twilio(ACCOUNT_ID, AUTH_TOKEN);
  }

  async sendEmail(email, template, subject, params) {
    try {
      const mailOptions = {
        from: emailConfig.email_name,
        to: email,
        subject,
        html: await this.getTemplate(template, params)
      };
      return await this.emailTransporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendPushMessageToAdmin(id, msg) {
    return await this.webSocketService.sendMessage(id, msg);
  }

  async sendSmsToPhoneNumber(phoneNumber, msg) {
    try {
      var data = await this.twilioService.messages.create({
        body: msg,
        to: phoneNumber,
        from: '+12318213554'
      });
      return data.sid;
    } catch (err) {
      console.log(err);
    }
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
