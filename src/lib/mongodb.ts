import mongoose from 'mongoose';
import dns from 'dns';

let cachedConnection: mongoose.Mongoose['connection'] | null = null;

function sanitizeUri(mongoUri: string): string {
  // Normalize whitespace
  const trimmed = mongoUri.trim();

  // Remove trailing slash so we can safely append /pawteller if needed.
  // (mongodb+srv URIs commonly look like: mongodb+srv://host/ ;)
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
}

function getDatabaseName(mongoUri: string): string | null {
  // If URI already includes a database path, keep it.
  // Examples:
  // - mongodb+srv://user:pass@host/pawteller?retryWrites=true => db = pawteller
  // - mongodb+srv://user:pass@host/?retryWrites=true => db = null
  // Note: URL parsing can be tricky with mongodb URIs, so do a simple check.
  const withoutQuery = mongoUri.split('?')[0];
  const afterHost = withoutQuery.split('@').pop() ?? withoutQuery;
  
  // afterHost starts with "host/db" (or just "host")
  const parts = afterHost.split('/').filter(Boolean);
  // parts[0] = host (or host:port), parts[1] (if present) = db name
  return parts.length >= 2 ? parts[1] : null;
}

const connectDB = async (): Promise<mongoose.Mongoose['connection']> => {
  dns.setServers(["1.1.1.1","8.8.8.8"]); // Use system default DNS servers
  if (cachedConnection || mongoose.connection.readyState === 1) {
    return cachedConnection ?? mongoose.connection;
  }
  
  const mongoUriRaw = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUriRaw) {
    throw new Error('Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI.');
  }

  const mongoUri = sanitizeUri(mongoUriRaw);
  const alreadyHasDb = getDatabaseName(mongoUri);

  // If the provided URI already targets a DB, don't append another "/pawteller".
  const finalUri = alreadyHasDb ? mongoUri : `${mongoUri}/pawteller`;

  try {
    // makes the failure surface faster.
    const conn = await mongoose.connect(finalUri,{
      serverSelectionTimeoutMS:5000,
      connectTimeoutMS:1000
    });

    cachedConnection = conn.connection;

    // Avoid leaking credentials. Show host only.
    const host = conn.connection.host;
    console.log(`MongoDB Connected (host): ${host}`);

    return cachedConnection;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
      // Helpful for diagnosing SRV/DNS failures (e.g. querySrv ECONNREFUSED).
      console.error('MongoDB connection error (full):', error);
      throw error;
    }

    throw new Error('MongoDB connection error');
  }
};

export default connectDB;

