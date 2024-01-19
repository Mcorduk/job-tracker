const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  reminderDate: { type: Date, required: true },
  notes: { type: String },
  // Other reminder-related fields as needed may be added in the future
});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;
