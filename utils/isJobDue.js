function isJobDue(job) {
  const now = new Date();

  // Handle non-repeating jobs
  if (!job.repeating) {
    return job.date <= now;
  }

  // Handle repeating jobs based on frequency
  switch (job.repeatingFrequency) {
    case "daily":
      return job.date.getDate() === now.getDate();

    case "hourly":
      return job.date.getDate() === now.getDate();

    case "weekly":
      return job.date.getDay() === now.getDay();

    case "monthly":
      return (
        job.date.getDate() === now.getDate() &&
        job.date.getMonth() === now.getMonth()
      );

    case "yearly":
      return (
        job.date.getDate() === now.getDate() &&
        job.date.getMonth() === now.getMonth()
      );

    default:
      // Handle unsupported frequencies or provide a default behavior
      throw new Error(
        `Unsupported repeating frequency: ${job.repeatingFrequency}`,
      );
  }
}

module.exports = isJobDue;
