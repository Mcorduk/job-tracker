const Job = require("../models/job");

const createNewJob = (req) => {
  const { title, description, dueDate, time, repeating, repeatingFrequency } =
    req.body;

  const newJob = new Job({
    title,
    description,
    dueDate: new Date(`${dueDate} ${time}`),
    repeating: repeating === "on", // Convert checkbox value to a boolean
    repeatingFrequency: repeating === "on" ? repeatingFrequency : null,
  });

  return newJob;
};

module.exports = createNewJob;
