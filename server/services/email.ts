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
      console.log('SendGrid email service initialized');
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
      console.log('NodeMailer email service initialized');
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

    return this.sendEmail(booking.customerEmail, emailContent);
  }

  async sendReviewInvitation(booking: Booking, reviewToken: string): Promise<boolean> {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const reviewLink = `${baseUrl}/submit-review/${reviewToken}`;

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

    return this.sendEmail(booking.customerEmail, emailContent);
  }

  private async sendEmail(to: string, content: { subject: string; text: string; html: string }): Promise<boolean> {
    try {
      if (this.provider === 'sendgrid' && this.sendgridClient) {
        await this.sendgridClient.send({
          to,
          from: process.env.SENDGRID_FROM_EMAIL || 'noreply@atlashomeservices.com',
          ...content
        });
      } else if (this.provider === 'nodemailer' && this.nodemailerTransport) {
        await this.nodemailerTransport.sendMail({
          from: process.env.GMAIL_USER,
          to,
          ...content
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