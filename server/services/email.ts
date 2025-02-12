import { Resend } from 'resend';
import type { Booking } from '@shared/schema';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailService {
  sendBookingConfirmation(booking: Booking): Promise<void>;
  sendAdminNotification(booking: Booking): Promise<void>;
}

class ResendEmailService implements EmailService {
  private async sendEmail(to: string, subject: string, html: string) {
    try {
      await resend.emails.send({
        from: 'Atlas HomeServices <notifications@atlas-paint.com>',
        to: [to],
        subject,
        html,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendBookingConfirmation(booking: Booking): Promise<void> {
    const subject = 'Booking Confirmation - Atlas HomeServices';
    const html = `
      <h1>Booking Confirmation</h1>
      <p>Dear ${booking.customerName},</p>
      <p>Thank you for booking our services. Here are your booking details:</p>
      <ul>
        <li>Service: ${booking.serviceType}</li>
        <li>Project Details: ${booking.projectDetails || 'Not provided'}</li>
        <li>Status: ${booking.status}</li>
      </ul>
      <p>We'll be in touch shortly to confirm your appointment.</p>
      <p>Best regards,<br>Atlas HomeServices Team</p>
    `;

    await this.sendEmail(booking.customerEmail, subject, html);
  }

  async sendAdminNotification(booking: Booking): Promise<void> {
    const subject = 'New Booking Notification - Atlas HomeServices';
    const html = `
      <h1>New Booking Received</h1>
      <p>A new booking has been received:</p>
      <ul>
        <li>Customer: ${booking.customerName}</li>
        <li>Email: ${booking.customerEmail}</li>
        <li>Phone: ${booking.customerPhone}</li>
        <li>Service: ${booking.serviceType}</li>
        <li>Project Details: ${booking.projectDetails || 'Not provided'}</li>
      </ul>
    `;

    // Send to admin email
    await this.sendEmail('atlas.homeservices@icloud.com', subject, html);
  }
}

export const emailService = new ResendEmailService();
