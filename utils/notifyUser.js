const notifyUser = (job) => {
  console.log(`Notification: Job "${job.title}" is due on ${new Date()}`);
};

module.exports = notifyUser;
