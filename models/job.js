const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  repeating: { type: Boolean, default: false },
  // Other job-related fields as needed may be added in the future
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
