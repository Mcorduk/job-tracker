const Job = require("../models/job");
const mongoose = require("mongoose");

const createNewJob = (info) => {
  const { title, description, dueDate, time, repeating, repeatingFrequency } =
    info;

  const repeatingVal = repeating === "on" || repeating === true;

  const newJob = new Job({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    dueDate,
    repeating: repeatingVal, // Convert checkbox value to a boolean
    repeatingFrequency: repeatingVal ? repeatingFrequency : null,
  });

  return newJob;
};

module.exports = createNewJob;
