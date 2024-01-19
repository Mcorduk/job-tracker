const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

/* Start of DB Connection */

mongoose.set("strictQuery", false);

// Load environment variables from a .env file using the dotenv package
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

// Check if the required environment variables are present, due to ESLint error
if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI is not set in the environment variables.");
  process.exit(1); // Exit the application with an error code
}

// Retrieve the MongoDB connection URL from the environment variables
const mongoURL = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose with specified options
mongoose.connect(mongoURL, {
  useNewUrlParser: true, // Use the new MongoDB driver's parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
});

// Asynchronous function to connect to MongoDB
async function main() {
  // Use the 'await' keyword to make sure the connection is established before proceeding
  await mongoose.connect(mongoURL);

  // Connection successful if the code execution reaches this point
  console.log("Connected to MongoDB");
}

// Call the main function and handle any potential errors
main().catch((err) => console.log(err));

/* End of DB Connection */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
