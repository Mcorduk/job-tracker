const express = require("express");
const cron = require("cron");
const router = express.Router();
const bodyParser = require("body-parser");
const Job = require("../models/job");
const Reminder = require("../models/reminder");
const isJobDue = require("../utils/isJobDue");
const { now } = require("mongoose");

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

// cron docs: https://www.npmjs.com/package/cron#-basic-usage
new cron.CronJob(
  "* * * * *", // job runs every minute, see: https://crontab.guru/#*_*_*_*_*
  async () => {
    try {
      const activeJobs = await Job.find({ repeating: true });

      activeJobs.forEach(async (job) => {
        // FIXME Form submitted is in activeJobs
        // But only the test 1 minute job passes is JobDue
        // Conclusion, fix isJobDue
        if (isJobDue(job)) {
          // Create a single reminder for the current due date
          const reminder = new Reminder({
            jobId: job._id,
            reminderDate: new Date(),
            notes: `I am a crone ran task created at ${new Date()} for job ${job.title}!`,
          });
          await reminder.save();

          // Trigger notification (for simplicity, print to console)
          console.log(
            `Notification: Job "${job.title}" is due on ${job.dueDate}`,
          );
        }
      });
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  },
  null,
  true,
); // Run in UTC time zone

// Handle POST request from the form submit
router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate, time, repeating, repeatingFrequency } =
      req.body;

    const newJob = new Job({
      title,
      description,
      dueDate: new Date(`${dueDate} ${time}`),
      repeating: repeating === "on", // Convert checkbox value to a boolean
      repeatingFrequency: repeating === "on" ? repeatingFrequency : null,
    });

    // Save the new job to database first to generate job._id values for Reminder
    const savedJob = await newJob.save();

    const newReminder = new Reminder({
      jobId: savedJob._id,
      reminderDate: savedJob.dueDate,
      notes: "I should be created by cron on repeating tasks!",
    });

    await newReminder.save();
    //FIXME I don't even get evaluated, just sitting here
    if (!repeating) {
      const newReminder = new Reminder({
        jobId: savedJob._id,
        reminderDate: savedJob.dueDate, // Use job's date for non-repeating jobs
        notes: "Don't forget about this(?) important task!",
      });
      await newReminder.save();
    }
    res.redirect("/form/success");
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation error
      let errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      res.status(400).json({ errors });
    } else {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
