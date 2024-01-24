const { CronJob } = require("cron");
const Job = require("../models/job");
const isJobDue = require("../utils/isJobDue");
const { notifyUser } = require("../utils/notifyUser");
const createNewJob = require("./createNewJob");
const calcFutureDate = require("./calcFutureDate");

const checkDueJobs = new CronJob(
  "* * * * *", // Run every minute
  async () => {
    try {
      const activeJobs = await Job.find();

      activeJobs.forEach(async (job) => {
        if (isJobDue(job)) {
          notifyUser(job);

          if (job.repeatingFrequency !== null) {
            const nextDueDate = calcFutureDate(
              job.dueDate,
              job.repeatingFrequency,
            );
            const newRepeatingJob = createNewJob({
              ...job._doc,
              dueDate: nextDueDate,
            });

            await newRepeatingJob.save();
          }
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
