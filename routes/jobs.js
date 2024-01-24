const express = require("express");
const Job = require("../models/job");

const router = express.Router();

// Handle GET request for the due-jobs page
router.get("/", async (req, res) => {
  try {
    const dueJobs = await Job.find({ dueDate: { $gt: new Date() } });

    if (dueJobs.length === 0) {
      return res.render("due-jobs", {
        dueJobs: [],
        message: "No jobs found. Please add more using ",
      });
    }

    const formattedDueJobs = dueJobs.map((job) => ({
      ...job._doc,
      dueDate: job.dueDate.toLocaleString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    }));

    res.render("jobs", { dueJobs: formattedDueJobs, message: null });
  } catch (error) {
    console.error("Error fetching due jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
