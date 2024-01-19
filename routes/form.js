const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const Job = require("../models/job");
const Reminder = require("../models/reminder");

// body-parser middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true }));

// Handle GET request for the form page
router.get("/", (req, res, next) => {
  const now = new Date();
  const minDate = now.toISOString().split("T")[0]; // Extract only the date part
  const maxDate = new Date(
    now.getFullYear() + 10,
    now.getMonth(),
    now.getDate(),
  )
    .toISOString()
    .split("T")[0]; // Extract the date part

  res.render("form", { minDate, maxDate });
});

// Handle GET request for the success page
router.get("/success", (req, res, next) => {
  res.render("success", {});
});

// Handle POST request from the form
router.post("/", async (req, res) => {
  try {
    // Extract data from the form submission
    const { title, description, date, time, repeating, repeatingFrequency } =
      req.body;

    // Create a new Job document in MongoDB
    const newJob = new Job({
      title,
      description,
      date: new Date(`${date} ${time}`), // Combine date and time into a single Date object
      repeating: repeating === "on", // Convert checkbox value to a boolean
      repeatingFrequency: repeating === "on" ? repeatingFrequency : null, // Set null if repeating is false
    });

    // Save the new job to the database first to generate _id values
    const savedJob = await newJob.save();

    const newReminder = new Reminder({
      jobId: savedJob._id,
      reminderDate: savedJob.date,
      notes: "Don't forget about this(?) important task!",
    });

    // Save the new reminder to the database
    await newReminder.save();

    // Optionally, redirect the user to a success page
    res.redirect("/form/success");
  } catch (error) {
    // Handle any errors that occurred during form submission
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
