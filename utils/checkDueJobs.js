const { CronJob } = require("cron");
const Job = require("../models/job");
const isJobDue = require("../utils/isJobDue");
const notifyUser = require("../utils/notifyUser");

const checkDueJobs = new CronJob(
  "* * * * *", // Run every minute
  async () => {
    try {
      console.log("checking for due jobs...");
      const activeJobs = await Job.find();

      activeJobs.forEach(async (job) => {
        if (isJobDue(job)) {
          notifyUser(job);
        }
      });
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  },
  null,
  true, // Run in UTC time zone
);

module.exports = checkDueJobs;
