import { users, type User, type InsertUser, type Booking, type InsertBooking, 
  type Notification, type InsertNotification, bookings, notifications } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { randomBytes } from 'crypto';
import { eq } from "drizzle-orm";
import { db } from './db';

export interface IStorage {
getUser(id: number): Promise<User | undefined>;
getUserByUsername(username: string): Promise<User | undefined>;
createUser(user: InsertUser): Promise<User>;
createBooking(booking: InsertBooking): Promise<Booking>;
createNotification(notification: InsertNotification): Promise<Notification>;
updateNotification(bookingId: number, status: string): Promise<void>;
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
return newBooking;
}

async createNotification(notification: InsertNotification): Promise<Notification> {
const [newNotification] = await db.insert(notifications).values(notification).returning();
return newNotification;
}

async updateNotification(bookingId: number, status: string): Promise<void> {
await db
.update(notifications)
.set({ status })
.where(eq(notifications.bookingId, bookingId));
}
}

// Export the storage implementation based on environment
export const storage = new DatabaseStorage();