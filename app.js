const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const connectToMongo = require("./db");
// routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const formRouter = require("./routes/form");

const app = express();

// db setup
// Asynchronous function to connect to MongoDB
async function main() {
  // Use the 'await' keyword to make sure the connection is established before proceeding
  await connectToMongo();
}

// Call the main function and handle any potential errors
main().catch((err) => console.log(err));

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
app.use("/form", formRouter);

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

console.log("Express app listening on port 3000");

module.exports = app;
