import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  // Booking route
  app.post('/api/bookings', async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);

      // Insert booking
      const booking = await storage.createBooking(validatedData);

      // Send notification
      await storage.createNotification({
        bookingId: booking.id,
        type: 'email',
        status: 'pending',
        content: `New booking from ${booking.customerName} for ${booking.serviceType}`
      });

      res.json({ success: true, booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid booking data',
          errors: error.errors 
        });
      }

      console.error('Booking error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create booking' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}