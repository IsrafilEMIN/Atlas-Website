import express, { Request, Response, NextFunction } from "express";
import { Booking } from './booking';

const router = express.Router();

// Custom error class for booking-related errors
class BookingError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'BookingError';
  }
}

// Middleware to handle async routes
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Validation middleware
const validateBookingRequest = (req: Request, res: Response, next: NextFunction) => {
  const { date, time, customerName } = req.body;
  
  if (!date || !time || !customerName) {
    throw new BookingError(400, 'Missing required booking information');
  }
  
  next();
};

// GET all bookings
router.get("/", asyncHandler(async (req: Request, res: Response) => {
  try {
    // TODO: Replace with actual database query
    const bookings: Booking[] = []; // Placeholder for database results
    res.status(200).json({
      status: "success",
      data: bookings
    });
  } catch (error) {
    throw new BookingError(500, 'Failed to fetch bookings');
  }
}));

// GET single booking
router.get("/:id", asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Replace with actual database query
    const booking = {}; // Placeholder for database result
    
    if (!booking) {
      throw new BookingError(404, `Booking with ID ${id} not found`);
    }
    
    res.status(200).json({
      status: "success",
      data: booking
    });
  } catch (error) {
    if (error instanceof BookingError) throw error;
    throw new BookingError(500, 'Failed to fetch booking');
  }
}));

// POST create new booking
router.post("/", validateBookingRequest, asyncHandler(async (req: Request, res: Response) => {
  try {
    const bookingData = req.body;
    // TODO: Replace with actual database insertion
    const newBooking = { ...bookingData, id: Date.now() }; // Placeholder
    
    res.status(201).json({
      status: "success",
      data: newBooking
    });
  } catch (error) {
    throw new BookingError(500, 'Failed to create booking');
  }
}));

// PUT update booking
router.put("/:id", validateBookingRequest, asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // TODO: Replace with actual database update
    const updatedBooking = { ...updateData, id }; // Placeholder
    
    if (!updatedBooking) {
      throw new BookingError(404, `Booking with ID ${id} not found`);
    }
    
    res.status(200).json({
      status: "success",
      data: updatedBooking
    });
  } catch (error) {
    if (error instanceof BookingError) throw error;
    throw new BookingError(500, 'Failed to update booking');
  }
}));

// DELETE booking
router.delete("/:id", asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // TODO: Replace with actual database deletion
    // Placeholder for deletion confirmation
    
    res.status(200).json({
      status: "success",
      message: `Booking ${id} successfully deleted`
    });
  } catch (error) {
    throw new BookingError(500, 'Failed to delete booking');
  }
}));

export const bookingsRouter = router;