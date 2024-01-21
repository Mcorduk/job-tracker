const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: { type: String, maxlength: 500, default: "" },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator(value) {
        // Custom validator to check if the date is in the future
        return value > new Date();
      },
      message: "Due Date must be in the future",
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

const Job = model("Job", jobSchema);

// Apply the compound index for efficient due date prioritization:
Job.schema.index({ dueDate: 1, _id: 1 }, { name: "dueDate_id_index" });

module.exports = Job;

/* Other job-related fields as needed may be added in the future
 Such as:
 status: { type: String, enum: ["new", "in-progress", "completed"] }, // New field for job status
 assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // New field for assigned user (references User model)
 priority: { type: Number, min: 1, max: 5 }, // New field for job priority
*/
