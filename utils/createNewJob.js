const Job = require("../models/job");

const createNewJob = (jobObject) => {
  const { title, description, dueDate, repeating, repeatingFrequency } =
    jobObject;

  // Convert checkbox value to a boolean
  const isRepeating = repeating === "on" || repeating === true;

  const newJob = new Job({
    title,
    description,
    dueDate,
    repeating: isRepeating,
    repeatingFrequency: isRepeating ? repeatingFrequency : null,
  });

  return newJob;
};

module.exports = createNewJob;
