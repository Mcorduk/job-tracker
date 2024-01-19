const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5, // Minimum length of 5 characters
    maxlength: 50, // Maximum length of 50 characters
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
  repeating: {
    type: Boolean,
    default: false,
    enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
    validate: {
      validator(value) {
        return !(this.repeating && !value); // Only allows true when a valid enum value is set
      },
      message: "Repeating flag can only be true with a valid frequency",
    },
  },
  // Other job-related fields as needed may be added in the future
  // Such as:
  // status: { type: String, enum: ["new", "in-progress", "completed"] }, // New field for job status
  // assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // New field for assigned user (references User model)
  // priority: { type: Number, min: 1, max: 5 }, // New field for job priority
});

// Virtual for genre's URL
jobSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/jobs/${this._id}`;
});

const Job = model("Job", jobSchema);

// FIXME Indices might need to be adjusted in the future
Job.schema.index({ title: "text" }); // Create an index for text search on title
Job.schema.index({ date: 1 }); // Create an index for sorting by date

module.exports = Job;
