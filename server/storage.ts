import { users, type User, type InsertUser, type Booking, type InsertBooking, 
         type Notification, type InsertNotification, type Review, type InsertReview,
         reviews, bookings, notifications } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { randomBytes } from 'crypto';
import { eq } from "drizzle-orm";
import { db } from './db';
import { emailService } from './services/email';

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  createReview(review: InsertReview): Promise<Review>;
  getReview(id: number): Promise<Review | undefined>;
  getReviewByToken(token: string): Promise<Review | undefined>;
  getPublishedReviews(): Promise<Review[]>;
  generateReviewToken(bookingId: number): Promise<string>;
  deleteReview(id: number): Promise<void>;
  updateReviewPublishStatus(id: number, isPublished: boolean): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    await emailService.sendBookingConfirmation(newBooking);
    return newBooking;
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const reviewToken = await this.generateReviewToken(review.bookingId);
    const [newReview] = await db.insert(reviews).values({
      ...review,
      reviewToken,
      isPublished: true
    }).returning();
    return newReview;
  }

  async getReview(id: number): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }

  async getReviewByToken(token: string): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.reviewToken, token));
    return review;
  }

  async getPublishedReviews(): Promise<Review[]> {
    return db.select().from(reviews).where(eq(reviews.isPublished, true));
  }

  async generateReviewToken(bookingId: number): Promise<string> {
    return randomBytes(32).toString('hex');
  }

  async deleteReview(id: number): Promise<void> {
    await db.delete(reviews).where(eq(reviews.id, id));
  }

  async updateReviewPublishStatus(id: number, isPublished: boolean): Promise<void> {
    await db
      .update(reviews)
      .set({ isPublished })
      .where(eq(reviews.id, id));
  }
}

export const storage = new DatabaseStorage();