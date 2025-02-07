import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
const result = config({
  path: resolve(process.cwd(), ".env.local"),
});

if (result.error) {
  console.error("Error loading .env.local file:", result.error);
  process.exit(1);
}

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

export {};
