const MILLISECONDS_PER_DAY = 86400000;
const MILLISECONDS_PER_HOUR = 3600000;

const calcFutureDate = (originalDate, repeatingFrequency) => {
  switch (repeatingFrequency) {
    case "daily":
      return addDaysToDate(originalDate, 1);

    case "hourly":
      return addHoursToDate(originalDate, 1);

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
  return new Date(date.getTime() + daysToAdd * MILLISECONDS_PER_DAY);
};

const addHoursToDate = (date, hoursToAdd) => {
  return new Date(date.getTime() + hoursToAdd * MILLISECONDS_PER_HOUR);
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
