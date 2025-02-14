import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // TODO: Replace with actual database query
        const bookings = []; // Placeholder for database results
        return res.status(200).json({
          status: "success",
          data: bookings
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: 'Failed to fetch bookings'
        });
      }

    case 'POST':
      try {
        const { date, time, customerName } = req.body;
        
        if (!date || !time || !customerName) {
          return res.status(400).json({
            status: "error",
            message: 'Missing required booking information'
          });
        }

        // TODO: Replace with actual database insertion
        const newBooking = { ...req.body, id: Date.now() };
        
        return res.status(201).json({
          status: "success",
          data: newBooking
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: 'Failed to create booking'
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({
        status: "error",
        message: `Method ${method} Not Allowed`
      });
  }
} 