// lib/dbConnect.ts (or wherever your database configuration lives)
import mongoose from "mongoose";
export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI || "";

  if (!MONGODB_URI) {
    return console.log(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }

  // Safely initialized from the global scope without falling back to undefined or using 'as any'
  if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
  }

  const cached = global.mongoose;

  async function connect() {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      // Store the connection promise globally to prevent multiple connections during hot-reloads
      cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then((mongooseInstance) => {
          return mongooseInstance;
        });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  }

  connect().catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
}