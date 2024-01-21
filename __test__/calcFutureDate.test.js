import calcFutureDate from "./calcFutureDate";

describe("calculateFutureDate", () => {
  it("should add one day for daily frequency", () => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    const futureDate = calcFutureDate(today, "daily");
    expect(futureDate).toBe(tomorrow);
  });

  it("should add one hour for hourly frequency", () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 3600000);
    const futureDate = calcFutureDate(now, "hourly");
    expect(futureDate).toBe(oneHourLater);
  });

  it("should add one week for weekly frequency", () => {
    const today = new Date();
    const oneWeekLater = new Date(today.getTime() + 7 * 86400000);
    const futureDate = calcFutureDate(today, "weekly");
    expect(futureDate).toBe(oneWeekLater);
  });

  it("should add one month, handling month boundaries", () => {
    const today = new Date(2024, 0, 31); // January 31st
    const oneMonthLater = new Date(2024, 1, 29); // February 29th (leap year)
    const futureDate = calcFutureDate(today, "monthly");
    expect(futureDate).toBe(oneMonthLater);
  });

  it("should add one year", () => {
    const today = new Date(2024, 1, 29);
    const oneYearLater = new Date(2025, 1, 29);
    const futureDate = calcFutureDate(today, "yearly");
    expect(futureDate).toBe(oneYearLater);
  });

  it("should throw an error for unsupported frequency", () => {
    expect(() => calcFutureDate(new Date(), "invalid")).toThrow(
      "Unsupported repeating frequency: invalid",
    );
  });
});
