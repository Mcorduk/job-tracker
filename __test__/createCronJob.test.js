const createCronJob = require("../utils/createCronJob");
const cron = require("cron");

jest.mock("cron");

describe("createCronJob", () => {
  afterEach(() => {
    cron.CronJob.mockClear(); // Clear mock calls after each test
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
  });

  // Add more tests for other frequencies, error handling, and edge cases
});
