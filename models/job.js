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
        return value > Date.now();
      },
      message: "Due Date must be in the future",
    },
  },
  repeating: {
    type: Boolean,
    default: false,
    validate: {
      validator(value) {
        if (value && !this.repeatingFrequency) {
          return false;
        }
        return true;
      },
      message: "Missing frequency for repeating job.",
    },
  },
  repeatingFrequency: {
    type: String,
    enum: ["hourly", "daily", "weekly", "monthly", "yearly"],
    default: null,
    validate: {
      validator(value) {
        if (value && !this.repeating) {
          return false;
        }
        return true;
      },
      message: "Frequency set on non-repeating job.",
    },
  },
});

jobSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the "this" object
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
