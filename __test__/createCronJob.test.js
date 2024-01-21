const createCronJob = require("../utils/createCronJob");
const cron = require("cron");

jest.mock("cron");

describe("createCronJob - (6) Successful Scenarios", () => {
  afterEach(() => {
    cron.CronJob.mockClear(); // Clear mock calls after each test
  });

  it("should create a one-time cron job with the correct expression", async () => {
    const date = new Date(2024, 0, 20, 15, 30); // Set a specific date and time
    const jobReference = createCronJob(date, null);

    const selectedMinute = date.getMinutes();
    const selectedHour = date.getHours();
    const selectedDay = date.getDay(); // Day of Week: [0-6]/[Sunday to Saturday]
    const selectedDate = date.getDate(); // Day of Month: [1-31]
    const selectedMonth = date.getMonth() + 1; // .getMonth is 0-11 but cron is 1-12
    const expectedExpression = `${selectedMinute} ${selectedHour} ${selectedDate} ${selectedMonth} *`;
    expect(cron.CronJob).toHaveBeenCalledWith(
      expectedExpression,
      expect.any(Function),
      null,
      true,
    );
    expect(jobReference).toBeDefined();
    expect(jobReference.job).toBeInstanceOf(cron.CronJob);
    expect(jobReference.start).toBeInstanceOf(Function);
    expect(jobReference.stop).toBeInstanceOf(Function);
  });

  it("should create an hourly cron job with the correct expression", async () => {
    const date = new Date(); // Use current time for testing
    const jobReference = createCronJob(date, "hourly");

    const expectedExpression = `${date.getMinutes()} * * * *`;
    expect(cron.CronJob).toHaveBeenCalledWith(
      expectedExpression,
      expect.any(Function),
      null,
      true,
    );
    expect(jobReference).toBeDefined();
    expect(jobReference.job).toBeInstanceOf(cron.CronJob);
    expect(jobReference.start).toBeInstanceOf(Function);
    expect(jobReference.stop).toBeInstanceOf(Function);
  });

  it("should create a daily cron job at a specific time", async () => {
    const date = new Date(2024, 0, 20, 15, 30); // Set a specific date and time
    const jobReference = createCronJob(date, "daily");

    const expectedExpression = `30 15 * * *`;
    expect(cron.CronJob).toHaveBeenCalledWith(
      expectedExpression,
      expect.any(Function),
      null,
      true,
    );
    expect(jobReference).toBeDefined();
    expect(jobReference.job).toBeInstanceOf(cron.CronJob);
    expect(jobReference.start).toBeInstanceOf(Function);
    expect(jobReference.stop).toBeInstanceOf(Function);
  });

  it("should create a weekly cron job on a Monday ", async () => {
    const date = new Date(2024, 0, 22, 10);
    const jobReference = createCronJob(date, "weekly");

    const expectedExpression = `0 10 * * 1`;
    expect(cron.CronJob).toHaveBeenCalledWith(
      expectedExpression,
      expect.any(Function),
      null,
      true,
    );
    expect(jobReference).toBeDefined();
    expect(jobReference.job).toBeInstanceOf(cron.CronJob);
    expect(jobReference.start).toBeInstanceOf(Function);
    expect(jobReference.stop).toBeInstanceOf(Function);
  });

  it("should create a weekly cron job on a Saturday ", async () => {
    const date = new Date(2024, 0, 20, 10);
    const jobReference = createCronJob(date, "weekly");

    const expectedExpression = `0 10 * * 6`;
    expect(cron.CronJob).toHaveBeenCalledWith(
      expectedExpression,
      expect.any(Function),
      null,
      true,
    );
    expect(jobReference).toBeDefined();
    expect(jobReference.job).toBeInstanceOf(cron.CronJob);
    expect(jobReference.start).toBeInstanceOf(Function);
    expect(jobReference.stop).toBeInstanceOf(Function);
  });

  it("should create a weekly cron job on a Friday", async () => {
    const date = new Date(2024, 0, 19, 10); // Set a date on a Friday
    const jobReference = createCronJob(date, "weekly");

    const expectedExpression = `0 10 * * 5`; // Friday is day 5 in cron
    expect(cron.CronJob).toHaveBeenCalledWith(
      expectedExpression,
      expect.any(Function),
      null,
      true,
    );
    expect(jobReference).toBeDefined();
    expect(jobReference.job).toBeInstanceOf(cron.CronJob);
    expect(jobReference.start).toBeInstanceOf(Function);
    expect(jobReference.stop).toBeInstanceOf(Function);
  });

  // Add more tests for other frequencies, error handling, and edge cases
});

describe("createCronJob - (6) Failure Scenarios", () => {
  afterEach(() => {
    cron.CronJob.mockClear();
  });

  it("should throw an error for an unsupported job frequency", async () => {
    const date = new Date();
    expect(() => createCronJob(date, "invalid-frequency")).toThrowError(
      "Unsupported job frequency: invalid-frequency",
    );
  });

  it("should throw an error for a non-date parameter", async () => {
    expect(() => createCronJob("invalid-date")).toThrowError(
      "Invalid date parameter",
    );
  });

  it("should throw an error for a null date parameter", async () => {
    expect(() => createCronJob(null)).toThrowError("Invalid date parameter");
  });

  it("should throw an error for a negative minute value", async () => {
    const date = new Date();
    date.setMinutes(-1);
    expect(() => createCronJob(date)).toThrowError("Invalid minute value: -1");
  });

  it("should throw an error for an invalid repeating frequency", async () => {
    const date = new Date();
    expect(() => createCronJob(date, "invalid-frequency")).toThrowError(
      "Unsupported job frequency: invalid-frequency",
    );
  });

  it("should throw an error for an invalid date parameter", async () => {
    expect(() => createCronJob("invalid-date")).toThrowError(
      "Invalid date parameter",
    );
  });
});
