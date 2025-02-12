import { MailService } from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { type Booking } from '@shared/schema';

export class EmailService {
  private sendgridClient?: MailService;
  private nodemailerTransport?: nodemailer.Transporter;
  private provider: 'sendgrid' | 'nodemailer';

  constructor() {
    // Initialize SendGrid if available
    if (process.env.SENDGRID_API_KEY) {
      this.sendgridClient = new MailService();
      this.sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);
      this.provider = 'sendgrid';
    }
    // Initialize NodeMailer if available
    else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      this.nodemailerTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      this.provider = 'nodemailer';
    } else {
      console.warn('No email service configured. Emails will not be sent.');
      this.provider = 'sendgrid'; // Default to SendGrid even if not configured
    }
  }

  async sendBookingConfirmation(booking: Booking): Promise<boolean> {
    const bookingDate = booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'Not specified';

    const emailContent = {
      subject: 'Your Painting Service Booking Confirmation',
      text: `Dear ${booking.customerName},\n\nThank you for booking with Atlas HomeServices!`,
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${booking.customerName},</p>
        <p>Thank you for booking with Atlas HomeServices! Here are your booking details:</p>
        <ul>
          <li>Service: ${booking.serviceType}</li>
          <li>Date: ${bookingDate}</li>
        </ul>
      `
    };

    try {
      if (this.provider === 'sendgrid' && this.sendgridClient) {
        await this.sendgridClient.send({
          to: booking.customerEmail,
          from: process.env.SENDGRID_FROM_EMAIL!,
          ...emailContent
        });
      } else if (this.provider === 'nodemailer' && this.nodemailerTransport) {
        await this.nodemailerTransport.sendMail({
          from: process.env.GMAIL_USER,
          to: booking.customerEmail,
          ...emailContent
        });
      } else {
        console.warn('No email service available');
        return false;
      }
      return true;
    } catch (error) {
      console.error(`${this.provider} email error:`, error);
      return false;
    }
  }

  async sendReviewInvitation(booking: Booking, reviewLink: string): Promise<boolean> {
    const emailContent = {
      subject: 'Share Your Experience with Atlas HomeServices',
      text: `Dear ${booking.customerName},\n\nWe value your feedback! Please share your experience by clicking this link: ${reviewLink}`,
      html: `
        <h1>Share Your Experience</h1>
        <p>Dear ${booking.customerName},</p>
        <p>We value your feedback! Please take a moment to share your experience with our service.</p>
        <p><a href="${reviewLink}">Click here to leave a review</a></p>
      `
    };

    try {
      if (this.provider === 'sendgrid' && this.sendgridClient) {
        await this.sendgridClient.send({
          to: booking.customerEmail,
          from: process.env.SENDGRID_FROM_EMAIL!,
          ...emailContent
        });
      } else if (this.provider === 'nodemailer' && this.nodemailerTransport) {
        await this.nodemailerTransport.sendMail({
          from: process.env.GMAIL_USER,
          to: booking.customerEmail,
          ...emailContent
        });
      } else {
        console.warn('No email service available');
        return false;
      }
      return true;
    } catch (error) {
      console.error(`${this.provider} email error:`, error);
      return false;
    }
  }
}

export const emailService = new EmailService();