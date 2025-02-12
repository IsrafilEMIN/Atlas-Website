import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (existing)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// TimeSlots table for managing availability
export const timeSlots = pgTable("time_slots", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
});

// Bookings table for appointments
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: varchar("customer_phone", { length: 20 }).notNull(),
  serviceType: text("service_type").notNull(),
  timeSlotId: integer("time_slot_id").references(() => timeSlots.id).notNull(),
  status: text("status").notNull().default('pending'),
  projectDetails: text("project_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// New reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  customerName: text("customer_name").notNull(),
  serviceType: text("service_type").notNull(),
  images: json("images").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  isPublished: boolean("is_published").notNull().default(false),
  reviewToken: text("review_token").notNull().unique(), // For custom review submission links
});

// Notifications table for tracking communications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").references(() => bookings.id).notNull(),
  type: text("type").notNull(), // 'email' or 'sms'
  status: text("status").notNull(),
  sentAt: timestamp("sent_at").defaultNow(),
  content: text("content").notNull(),
});

// Zod schemas for validation
export const insertTimeSlotSchema = createInsertSchema(timeSlots).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews)
  .omit({
    id: true,
    createdAt: true,
    isPublished: true,
    reviewToken: true,
  })
  .extend({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10),
    images: z.array(z.string().url()).optional(),
  });

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  sentAt: true,
});

// Types for TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type User = typeof users.$inferSelect;
export type TimeSlot = typeof timeSlots.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Notification = typeof notifications.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});