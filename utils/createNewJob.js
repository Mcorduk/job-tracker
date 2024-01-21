const Job = require("../models/job");

const createNewJob = (info) => {
  const { title, description, dueDate, time, repeating, repeatingFrequency } =
    info;

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
