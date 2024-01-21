const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const checkDueJobs = require("../utils/checkDueJobs");
const createNewJob = require("../utils/createNewJob");

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

// Start the cron job
checkDueJobs.start();

// Handle POST request from the form submit
router.post("/", async (req, res) => {
  try {
    const newJob = createNewJob(req.body);
    await newJob.save();

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
