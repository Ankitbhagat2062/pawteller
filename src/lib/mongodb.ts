import dns from "dns";
import { MongoClient, ServerApiVersion } from "mongodb";
// Fix local DNS resolution issues on fragile local network routers
if (process.env.NODE_ENV === "development") {
  try {
    dns.setDefaultResultOrder("ipv4first");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (e) {
    console.warn("Could not set DNS resolution order:", e);
  }
}

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


  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(finalUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
 run().catch(console.dir);

};

export default connectDB;