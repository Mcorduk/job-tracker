const calcFutureDate = (originalDate, repeatingFrequency) => {
  switch (repeatingFrequency) {
    case "hourly":
      return addHoursToDate(originalDate, 1);

    case "daily":
      return addDaysToDate(originalDate, 1);

    case "weekly":
      return addDaysToDate(originalDate, 7);

    case "monthly":
      return addMonthsToDate(originalDate, 1);

    case "yearly":
      return addYearsToDate(originalDate, 1);

    default:
      throw new Error(`Unsupported repeating frequency: ${repeatingFrequency}`);
  }
};

const addDaysToDate = (date, daysToAdd) => {
  const newDate = new Date(date.getTime());
  newDate.setDate(date.getDate() + daysToAdd);
  return newDate;
};

const addHoursToDate = (date, hoursToAdd) => {
  date.setHours(date.getHours() + hoursToAdd);
  return date;
};

const addMonthsToDate = (date, monthsToAdd) => {
  const newMonth = date.getMonth() + monthsToAdd;
  const newYear =
    newMonth >= 12
      ? date.getFullYear() + Math.floor(newMonth / 12)
      : date.getFullYear();
  const monthInNextYear = newMonth % 12;
  const newDate = new Date(newYear, monthInNextYear, date.getDate());
  return newDate;
};

const addYearsToDate = (date, yearsToAdd) => {
  return new Date(date.setFullYear(date.getFullYear() + yearsToAdd));
};

module.exports = calcFutureDate;
