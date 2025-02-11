import { users, type User, type InsertUser, type Booking, type InsertBooking, type Notification, type InsertNotification } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

// Ensure we configure the pool properly for serverless environment
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000, // 5 second timeout
  max: 1, // Limit connections for serverless environment
});

// Initialize drizzle with the serverless-optimized pool
const db = drizzle(pool);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createNotification(notification: InsertNotification): Promise<Notification>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private notifications: Map<number, Notification>;
  private currentId: number;
  private bookingId: number;
  private notificationId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.notifications = new Map();
    this.currentId = 1;
    this.bookingId = 1;
    this.notificationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingId++;
    const booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: 'pending'
    } as Booking;

    this.bookings.set(id, booking);
    return booking;
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.notificationId++;
    const notification = {
      ...insertNotification,
      id,
      sentAt: new Date()
    } as Notification;

    this.notifications.set(id, notification);
    return notification;
  }
}

// Export the storage implementation based on environment
export const storage = process.env.NODE_ENV === 'production' 
  ? db
  : new MemStorage();