//changes date field to dueDate due to change in job schema

const Job = require("./models/job");

async function migrate() {
  const jobs = await Job.find();
  for (const job of jobs) {
    job.dueDate = job.date;
    await job.save();
  }
}

migrate();
