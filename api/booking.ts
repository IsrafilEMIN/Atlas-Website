// /api/booking.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

type BookingData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  projectDetails: string;
  date: string; // expected in ISO or datetime-local format
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
      }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed. Please use POST.' });
  }

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      projectDetails,
      date,
    } = req.body as BookingData;

    // Basic validation to ensure all required fields are provided
    if (!customerName || !customerEmail || !customerPhone || !serviceType || !projectDetails || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Insert additional validations here (e.g., email format, date validity)

    // Process the booking (e.g., save to a database, send notifications, etc.)
    console.log('Received booking:', {
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      projectDetails,
      date,
    });

    // Return success response
    return res.status(200).json({
      message: 'Booking received successfully',
      booking: { customerName, customerEmail, customerPhone, serviceType, projectDetails, date },
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
