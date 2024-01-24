const { EventEmitter } = require("events");

const eventEmitter = new EventEmitter();

const notifyUser = (job) => {
  console.log(`Notification: Job "${job.title}" is due on ${new Date()}`);
  eventEmitter.emit("jobDue", job);
};

module.exports = { notifyUser, eventEmitter };
