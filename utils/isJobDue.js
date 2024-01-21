// FIXME RIGHT NOW I am a failure of a function,I break constantly, fix me
function isJobDue(job) {
  const now = new Date();

  // Handle non-repeating jobs
  if (!job.repeating) {
    return job.dueDate <= now;
  }

  switch (job.repeatingFrequency) {
    case "daily":
      return job.dueDate.getDate() === now.getDate();

    case "hourly": // FIXME This logic right here fails
      return job.dueDate.getDate() === now.getDate();

    case "weekly":
      return job.dueDate.getDay() === now.getDay();

    case "monthly":
      return (
        job.dueDate.getDate() === now.getDate() &&
        job.dueDate.getMonth() === now.getMonth()
      );

    case "yearly":
      return (
        job.dueDate.getDate() === now.getDate() &&
        job.dueDate.getMonth() === now.getMonth()
      );

    default:
      throw new Error(
        `Unsupported repeating frequency: ${job.repeatingFrequency}`,
      );
  }
}

module.exports = isJobDue;
