import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        // TODO: Replace with actual database query
        const booking = { id }; // Placeholder for database result
        
        if (!booking) {
          return res.status(404).json({
            status: "error",
            message: `Booking with ID ${id} not found`
          });
        }
        
        return res.status(200).json({
          status: "success",
          data: booking
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: 'Failed to fetch booking'
        });
      }

    case 'PUT':
      try {
        const { date, time, customerName } = req.body;
        
        if (!date || !time || !customerName) {
          return res.status(400).json({
            status: "error",
            message: 'Missing required booking information'
          });
        }

        // TODO: Replace with actual database update
        const updatedBooking = { ...req.body, id };
        
        return res.status(200).json({
          status: "success",
          data: updatedBooking
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: 'Failed to update booking'
        });
      }

    case 'DELETE':
      try {
        // TODO: Replace with actual database deletion
        return res.status(200).json({
          status: "success",
          message: `Booking ${id} successfully deleted`
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: 'Failed to delete booking'
        });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({
        status: "error",
        message: `Method ${method} Not Allowed`
      });
  }
}