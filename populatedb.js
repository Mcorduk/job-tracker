const connectToMongo = require("./db"); // Import the connection function
const Job = require("./models/job");
const Reminder = require("./models/reminder");

const generateDummyJobs = () => {
  const dummyJobs = [
    {
      title: "Complete important assignment",
      description: "Work on the final project for the course",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Set a date in the future
    },
    {
      title: "Attend weekly team meeting",
      description: "Join the online team meeting on Zoom",
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      repeating: true,
      repeatingFrequency: "weekly",
    },
    {
      title: "Submit monthly report",
      description: "Compile and submit the sales report for the month",
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      repeating: true,
      repeatingFrequency: "monthly",
    },
  ];

  return dummyJobs;
};

const createDummyReminders = (jobs) => {
  const dummyReminders = jobs.map((job) => ({
    jobId: job._id,
    reminderDate: new Date(job.date - 1 * 24 * 60 * 60 * 1000), // Set reminder a day before the job
    notes: "Don't forget about this important task!",
  }));

  return dummyReminders;
};

const insertData = async () => {
  try {
    await connectToMongo(); // Establish the database connection

    const dummyJobs = generateDummyJobs();
    await Job.insertMany(dummyJobs);

    const dummyReminders = createDummyReminders(dummyJobs);
    await Reminder.insertMany(dummyReminders);

    console.log("Dummy data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

insertData();
