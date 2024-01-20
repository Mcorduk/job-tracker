const cron = require("cron");
const Job = require("../models/job");
const Reminder = require("../models/reminder");
const isJobDue = require("../utils/isJobDue");

// cron docs: https://www.npmjs.com/package/cron#-basic-usage
// this is the logic to check mongodb every minute for due jobs and print notification #FIXME Adjust this comment if notification gets seperated
const cronJob = new cron.CronJob(
  "* * * * *", // job runs every minute, see: https://crontab.guru/#*_*_*_*_*
  async () => {
    try {
      const activeJobs = await Job.find({ repeating: true });

      activeJobs.forEach(async (job) => {
        if (isJobDue(job)) {
          // Create a single reminder for the current due date
          console.log(job.date);
          const reminder = new Reminder({
            jobId: job._id,
            reminderDate: new Date(),
            notes: `I am a cron ran task created at ${new Date()} for job ${job.title}!
            This job was created in ${job.createdAt}`,
          });
          await reminder.save();

          // Trigger notification (for simplicity, print to console)
          console.log(
            `Notification: Job "${job.title}" is due on ${new Date()}
            This job was created in ${job.createdAt}`,
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

module.exports = cronJob;
