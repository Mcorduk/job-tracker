const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: { type: String, maxlength: 500, default: "" },
  date: {
    type: Date,
    required: true,
    validate: {
      validator(value) {
        // Custom validator to check if the date is in the future
        return value > new Date();
      },
      message: "Date must be in the future",
    },
  },
  // Option for a job is repeating or not
  repeating: {
    type: Boolean,
    default: false,
    validate: {
      validator(value) {
        return !(value && !this.repeatingFrequency); // Ensure frequency is present if repeating is true
      },
      message: "Repeating jobs must have a repeating frequency",
    },
  },

  repeatingFrequency: {
    type: String,
    enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
    default: null, // Default to empty string for non-repeating jobs
  },
});

// Virtual for job's URL
jobSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/jobs/${this._id}`;
});

// Virtual to easily access the jobs associated reminders
jobSchema.virtual("reminders").get(function () {
  return this.model("Reminder").find({ jobId: this._id });
});

const Job = model("Job", jobSchema);

// FIXME Indices might need to be adjusted in the future
Job.schema.index({ title: "text" }); // Create an index for text search on title
Job.schema.index({ date: 1 }); // Create an index for sorting by date

module.exports = Job;

/* Other job-related fields as needed may be added in the future
 Such as:
 status: { type: String, enum: ["new", "in-progress", "completed"] }, // New field for job status
 assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // New field for assigned user (references User model)
 priority: { type: Number, min: 1, max: 5 }, // New field for job priority
*/
