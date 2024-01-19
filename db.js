// Load environment variables from a .env file using the dotenv package
require("dotenv").config();

// Check if the required environment variables are present
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not set in the environment variables.");
  process.exit(1); // Exit the application with an error code
}

// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

console.log("Connecting to MongoDB...");
// Retrieve the MongoDB connection URL from the environment variables
const mongoURL = process.env.MONGODB_URI;

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit with an error code
  }
}

module.exports = connectToMongo;
