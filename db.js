const mongoose = require("mongoose");
// Load environment variables from a .env file using the dotenv package
require("dotenv").config();

if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not set in the environment variables.");
  process.exit(1);
}

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

console.log("Connecting to MongoDB...");
const mongoURL = process.env.MONGODB_URI;

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectToMongo;
