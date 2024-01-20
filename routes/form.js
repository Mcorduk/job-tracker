const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const Job = require("../models/job");
const Reminder = require("../models/reminder");

// body-parser middleware to parse form data
router.use(bodyParser.urlencoded({ extended: true })); // extended: true to be able to deal with complex data structures in form

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
    .split("T")[0];

  res.render("form", { minDate, maxDate });
});

// Handle GET request for the success page
router.get("/success", (req, res, next) => {
  res.render("success", {});
});

// Handle POST request from the form submit
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, repeating, repeatingFrequency } =
      req.body;

    const newJob = new Job({
      title,
      description,
      date: new Date(`${date} ${time}`),
      repeating: repeating === "on", // Convert checkbox value to a boolean
      repeatingFrequency: repeating === "on" ? repeatingFrequency : null,
    });

    // Save the new job to database first to generate job._id values for Reminder
    const savedJob = await newJob.save();

    const newReminder = new Reminder({
      jobId: savedJob._id,
      reminderDate: savedJob.date,
      notes: "Don't forget about this(?) important task!",
    });

    await newReminder.save();

    // Redirect the user to success page
    res.redirect("/form/success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
