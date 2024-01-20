const cron = require("cron");

function createCronJob(date, jobFrequency) {
  const selectedMinute = date.getMinutes();
  const selectedHour = date.getHours();
  const selectedDay = date.getDay(); // Day of Week: [0-6]/[Sunday to Saturday]
  const selectedDate = date.getDate(); // Day of Month: [1-31]
  const selectedMonth = date.getMonth + 1; // .getMonth is 0-11 but cron is 1-12

  // cronExpressions tool, see: https://crontab.guru/#*_*_*_*_*
  let cronExpression;
  switch (jobFrequency) {
    case "hourly":
      cronExpression = `${selectedMinute} * * * *`;
      break;
    case "daily":
      cronExpression = `${selectedMinute} ${selectedHour} * * *`;
      break;
    case "weekly":
      cronExpression = `${selectedMinute} ${selectedHour} * * ${selectedDay}`;
      break;
    case "monthly":
      cronExpression = `${selectedMinute} ${selectedHour} ${selectedDate} * *`;
      break;
    case "yearly":
      cronExpression = `${selectedMinute} ${selectedHour} ${selectedDate} ${selectedMonth} *`;
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
