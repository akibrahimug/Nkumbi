// /lib/mongoose.ts
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI || "";

// Global is used here to maintain a cached connection across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable in .env.local"
    );
  }

  if (global.mongooseConn) {
    // If already connected, return the promise
    return global.mongooseConn;
  }

  // Set up the connection promise
  global.mongooseConn = mongoose
    .connect(MONGODB_URI)
    .then((conn: typeof mongoose) => {
      console.log("Mongoose connected");
      return conn;
    })
    .catch((err: Error) => {
      console.error("Mongoose connection error:", err);
      throw err;
    });

  return global.mongooseConn;
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(MONGODB_URI, options);
  }
  client = globalWithMongo._mongoClient;
  // client.connect();
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI, options);
  // clientPromise = client.connect();
}
client.connect().then((c) => {
  mongoose.createConnection().setClient(c);
});
// Add client to mongoose
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;
