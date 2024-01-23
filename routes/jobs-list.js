const express = require("express");
const Job = require("../models/job");

const router = express.Router();

// Handle GET request for the due-jobs page
router.get("/due-jobs", async (req, res) => {
  try {
    const dueJobs = await Job.find({ dueDate: { $gt: new Date() } });

    res.render("due-jobs", { dueJobs });
  } catch (error) {
    console.error("Error fetching due jobs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
