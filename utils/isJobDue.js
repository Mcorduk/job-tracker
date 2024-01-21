// FIXME RIGHT NOW I am a failure of a function,I break constantly, fix me
function isJobDue(job) {
  const now = new Date();

  // Handle non-repeating jobs
  if (job) {
    const dueDateWithinThisMinute =
      job.dueDate <= now && now < new Date(job.dueDate.getTime() + 60000);
    return dueDateWithinThisMinute;
  }
}

module.exports = isJobDue;
