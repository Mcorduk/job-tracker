function isReminderDue(reminderDate) {
  const currentDate = new Date();
  return reminderDate <= currentDate;
}

module.exports = isReminderDue;
