// cronExpressions.js

module.exports = {
  getOneTimeExpression: (date) => {
    const selectedMinute = date.getMinutes();
    const selectedHour = date.getHours();
    const selectedDate = date.getDate();
    const selectedMonth = date.getMonth() + 1;
    return `${selectedMinute} ${selectedHour} ${selectedDate} ${selectedMonth} *`;
  },

  getHourlyExpression: (date) => {
    const selectedMinute = date.getMinutes();
    return `${selectedMinute} * * * *`;
  },

  getDailyExpression: (date) => {
    const selectedMinute = date.getMinutes();
    const selectedHour = date.getHours();
    return `${selectedMinute} ${selectedHour} * * *`;
  },

  getWeeklyExpression: (date) => {
    const selectedMinute = date.getMinutes();
    const selectedHour = date.getHours();
    const selectedDay = date.getDay();
    return `${selectedMinute} ${selectedHour} * * ${selectedDay}`;
  },

  getMonthlyExpression: (date) => {
    const selectedMinute = date.getMinutes();
    const selectedHour = date.getHours();
    const selectedDate = date.getDate();
    return `${selectedMinute} ${selectedHour} ${selectedDate} * *`;
  },

  getYearlyExpression: (date) => {
    const selectedMinute = date.getMinutes();
    const selectedHour = date.getHours();
    const selectedDate = date.getDate();
    const selectedMonth = date.getMonth() + 1;
    return `${selectedMinute} ${selectedHour} ${selectedDate} ${selectedMonth} *`;
  },
};
