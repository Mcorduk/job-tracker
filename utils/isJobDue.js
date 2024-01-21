const isJobDue = (job) => {
  const now = new Date();

  if (job) {
    const dueDateWithinThisMinute =
      job.dueDate <= now && now < new Date(job.dueDate.getTime() + 60000);
    return dueDateWithinThisMinute;
  }
};

module.exports = isJobDue;
