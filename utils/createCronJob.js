const cron = require("cron");
const exp = require("./getCronExpressions");

function createCronJob(date, jobFrequency = null) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("Invalid date parameter");
  }
  let cronExpression;

  switch (jobFrequency) {
    case null:
      cronExpression = exp.getOneTimeExpression(date);
      break;
    case "hourly":
      cronExpression = exp.getHourlyExpression(date);
      break;
    case "daily":
      cronExpression = exp.getDailyExpression(date);
      break;
    case "weekly":
      cronExpression = exp.getWeeklyExpression(date);
      break;
    case "monthly":
      cronExpression = exp.getMonthlyExpression(date);
      break;
    case "yearly":
      cronExpression = exp.getYearlyExpression(date);
      break;
    default:
      throw new Error(`Unsupported job frequency: ${jobFrequency}`);
  }

  const job = new cron.CronJob(
    cronExpression,
    async () => {
      // Code for your job's actions
      console.log("Job executed at", new Date());
      // Replace with your actual job logic

      // if jobFrequency is null, stop the job after execution
      if (jobFrequency === null) {
        job.stop();
      }
    },
    null,
    true, // Run in UTC time zone
  );

  return {
    job,
    start: () => job.start(),
    stop: () => job.stop(),
  };
}

module.exports = createCronJob;
