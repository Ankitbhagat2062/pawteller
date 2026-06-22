import dns from "dns";
import mongoose from "mongoose";

// Fix local DNS resolution issues on fragile local network routers
if (process.env.NODE_ENV === "development") {
  try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (e) {
    console.warn("Could not set DNS resolution order:", e);
  }
}

let cachedConnection: mongoose.Mongoose["connection"] | null = null;
let cachedUri: string | null = null;

function sanitizeUri(mongoUri: string): string {
  const trimmed = mongoUri.trim();
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

function getDatabaseName(mongoUri: string): string | null {
  const withoutQuery = mongoUri.split("?")[0];
  const afterHost = withoutQuery.split("@").pop() ?? withoutQuery;
  const parts = afterHost.split("/").filter(Boolean);
  return parts.length >= 2 ? parts[1] : null;
}

export const connectDB = async (
  mongodburi?: string,
) => {
  const mongoUriRaw =
  mongodburi || process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (!mongoUriRaw) {
    throw new Error(
      "Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI.",
    );
  }
  const mongoUri = sanitizeUri(mongoUriRaw);
  const alreadyHasDb = getDatabaseName(mongoUri);
  const finalUri = alreadyHasDb ? mongoUri : `${mongoUri}/pawteller`;
  

  if (
    cachedConnection &&
    cachedUri === finalUri &&
    mongoose.connection.readyState === 1
  ) {
    return cachedConnection;
  }

  if (mongoose.connection.readyState === 1 && cachedUri === finalUri) {
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }

  if (mongoose.connection.readyState !== 0 && cachedUri !== finalUri) {
    await mongoose.disconnect();
    cachedConnection = null;
    cachedUri = null;
  }

  try {
    const conn = await mongoose.connect(finalUri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000, // Increased timeout to give DNS lookups breathing room
    });

    cachedConnection = conn.connection;
    cachedUri = finalUri;

    const host = conn.connection.host;
    console.log(`MongoDB Connected (host): ${host}`);

    return cachedConnection;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
      throw error;
    }
    throw new Error("MongoDB connection error");
  }
};

export default connectDB;