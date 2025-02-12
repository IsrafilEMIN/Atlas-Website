import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  // Existing booking route
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

      // Send email confirmation
      await sendBookingEmail(booking);

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

  // New review routes
  app.post('/api/reviews', async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.json({ success: true, review });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Invalid review data',
          errors: error.errors
        });
      }
      console.error('Review creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create review'
      });
    }
  });

  app.get('/api/reviews/published', async (req, res) => {
    try {
      const reviews = await storage.getPublishedReviews();
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch reviews'
      });
    }
  });

  app.get('/api/reviews/:token', async (req, res) => {
    try {
      const review = await storage.getReviewByToken(req.params.token);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found'
        });
      }
      res.json(review);
    } catch (error) {
      console.error('Error fetching review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch review'
      });
    }
  });

  // Generate review link for a booking
  app.post('/api/reviews/generate-link/:bookingId', async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const token = await storage.generateReviewToken(bookingId);
      const reviewLink = `${process.env.PUBLIC_URL || 'https://your-domain.com'}/submit-review/${token}`;
      
      res.json({
        success: true,
        reviewLink
      });
    } catch (error) {
      console.error('Error generating review link:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate review link'
      });
    }
  });

  app.post('/api/reviews/token/:bookingId', async (req, res) => {
    try {
      const token = await storage.generateReviewToken(parseInt(req.params.bookingId));
      res.json({ success: true, token });
    } catch (error) {
      console.error('Error generating review token:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate review token'
      });
    }
  });

  // Delete a review
  app.delete('/api/reviews/:id', async (req, res) => {
    try {
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete review'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}