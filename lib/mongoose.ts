import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function connectDB() {
  // If already connected, do nothing
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  // If there's an existing connection (readyState = 1), reuse it
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  // Otherwise, create a new connection
  try {
    const dbName = "nkumbiDB";
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName,
      // If needed, you can pass options such as:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
}
