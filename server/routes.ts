import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.post('/api/bookings', async (req, res) => {
    try {
      const booking = await storage.insertBooking(req.body);
      
      // Send email notification
      await storage.insertNotification({
        bookingId: booking.id,
        type: 'email',
        status: 'pending',
        content: `New booking from ${booking.customerName} for ${booking.serviceType} on ${booking.date}`
      });

      res.json({ success: true, booking });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ success: false, message: 'Failed to create booking' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
