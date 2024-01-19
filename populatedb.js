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

const insertData = async () => {
  try {
    await connectToMongo();

    // Insert jobs first to generate _id values
    const savedJobs = await Job.insertMany(generateDummyJobs());

    // Create reminders using the generated _id values
    const dummyReminders = savedJobs.map((job) => ({
      jobId: job._id, // Assign the correct _id
      reminderDate: job.date,
      notes: "Don't forget about this(?) important task!",
    }));

    await Reminder.insertMany(dummyReminders);

    console.log("Dummy data inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting data:", error);
    process.exit(1);
  }
};
insertData();
