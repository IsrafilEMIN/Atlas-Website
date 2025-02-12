import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";
import { emailService } from "./services/email";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.REVIEW_API_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

export function registerRoutes(app: Express): Server {
  // Booking route
  app.post('/api/bookings', async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
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

  // Public endpoint to submit a review using a token
  app.post('/api/reviews/submit', async (req, res) => {
    try {
      const { token, rating, comment } = req.body;
      const review = await storage.getReviewByToken(token);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review token not found or expired'
        });
      }

      // Update the review with customer feedback
      await storage.updateReview(review.id, {
        rating,
        comment,
        isPublished: true
      });

      res.json({
        success: true,
        message: 'Review submitted successfully'
      });
    } catch (error) {
      console.error('Review submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit review'
      });
    }
  });

  // Get review by token (Public)
  app.get('/api/reviews/token/:token', async (req, res) => {
    try {
      const review = await storage.getReviewByToken(req.params.token);
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review token not found or expired'
        });
      }
      res.json({ success: true, review });
    } catch (error) {
      console.error('Error fetching review by token:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch review'
      });
    }
  });

  // Get all published reviews (Public)
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

  // Admin endpoints (protected by API key)

  // Create a new review
  app.post('/api/reviews', authenticate, async (req, res) => {
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

  // Generate authenticated review link (Protected by API key)
  app.post('/api/reviews/generate-link/:bookingId', authenticate, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const booking = await storage.getBooking(bookingId);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found'
        });
      }

      const token = await storage.generateReviewToken(bookingId);

      // Send email invitation with review link
      const emailSent = await emailService.sendReviewInvitation(booking, token);

      res.json({
        success: true,
        token,
        emailSent
      });
    } catch (error) {
      console.error('Error generating review link:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate review link'
      });
    }
  });

  // Delete a review (Protected by API key)
  app.delete('/api/reviews/:id', authenticate, async (req, res) => {
    try {
      await storage.deleteReview(parseInt(req.params.id));
      res.json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete review'
      });
    }
  });

  // Update a review's published status (Protected by API key)
  app.patch('/api/reviews/:id/publish', authenticate, async (req, res) => {
    try {
      const { isPublished } = req.body;
      await storage.updateReviewPublishStatus(parseInt(req.params.id), isPublished);
      res.json({ success: true, message: 'Review status updated successfully' });
    } catch (error) {
      console.error('Error updating review status:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update review status'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}