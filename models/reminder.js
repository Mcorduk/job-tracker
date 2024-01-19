const { Schema, model } = require("mongoose");

const reminderSchema = new Schema({
  // Reference to the associated Job document
  jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
  // Date and time when the reminder should be triggered
  reminderDate: { type: Date, required: true },
  // Optional additional notes related to the reminder
  notes: { type: String },

  // Other reminder-related fields as needed may be added in the future
  // TODO: Add other reminder-related fields as needed, such as:
  // - userReference: { type: Schema.Types.ObjectId, ref: "User", comment: "Links the reminder to the intended recipient" },
  // - notificationChannel: { type: String, enum: ["email", "sms", "in-app"], comment: "Specifies the preferred method for delivering the reminder notification" },
  // - status: { type: String, enum: ["pending", "sent", "acknowledged"], comment: "Tracks the current status of the reminder for monitoring and re-sending" },
});

const Reminder = model("Reminder", reminderSchema);

module.exports = Reminder;
