import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { emailService } from "./services/email";
import { and, eq, gte } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Enable CORS for the booking route
  app.options('/api/bookings', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
  });

  // Booking route
  app.post('/api/bookings', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
      // Validate request body
      const validatedData = insertBookingSchema.parse(req.body);

      // Insert booking
      const booking = await storage.createBooking(validatedData);

      // Create notification record
      await storage.createNotification({
        bookingId: booking.id,
        type: 'email',
        status: 'pending',
        content: `New booking from ${booking.customerName} for ${booking.serviceType}`
      });

      // Send emails
      try {
        await Promise.all([
          emailService.sendBookingConfirmation(booking),
          emailService.sendAdminNotification(booking)
        ]);

        // Update notification status to sent
        await storage.updateNotification(booking.id, 'sent');
      } catch (emailError) {
        console.error('Failed to send emails:', emailError);
        // Don't fail the booking if email fails
        await storage.updateNotification(booking.id, 'failed');
      }

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

  // Get available time slots
  app.get('/api/timeslots', async (req, res) => {
    try {
      const date = req.query.date as string;
      if (!date) {
        return res.status(400).json({ success: false, message: 'Date is required' });
      }

      const selectedDate = new Date(date);
      const slots = await storage.getTimeSlots(selectedDate);
      res.json({ success: true, slots });
    } catch (error) {
      console.error('Error fetching time slots:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch time slots' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}