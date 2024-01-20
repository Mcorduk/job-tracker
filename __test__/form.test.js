const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const connectToMongo = require("../db");

beforeAll(async () => {
  await connectToMongo();
});

describe("Form Submission", () => {
  it("should submit the job form successfully", async () => {
    const response = await request(app).post("/form").send({
      title: "Test Successful Job",
      description: "Testing for a successfull submit.",
      date: "2025-01-01",
      time: "12:00",
      repeating: "on",
      repeatingFrequency: "daily",
    });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/form/success");
  });

  it("should handle form submission errors", async () => {
    const response = await request(app).post("/form").send({
      // Invalid data to trigger an error
      title: "",
      description:
        "This is a test job for unsuccessful submit. Reason: empty title",
      date: "2025-01-01",
      time: "12:00",
      repeating: false,
      repeatingFrequency: null,
    });

    expect(response.status).toBe(500);
    expect(response.text).toContain("Internal Server Error");
  });
});

it("should handle form submission errors for invalid date", async () => {
  const response = await request(app).post("/form").send({
    title: "Test Invalid Date Job",
    description: "Testing for an unsuccessful submit due to invalid date.",
    date: "invalid-date",
    time: "12:00",
    repeating: false,
    repeatingFrequency: null,
  });

  expect(response.status).toBe(400); // Adjust the status code based on your error handling
  expect(response.text).toContain("Invalid date format");
});

it("should handle form submission errors for past date", async () => {
  // Assuming you have validation logic to prevent past dates
  const response = await request(app).post("/form").send({
    title: "Test Past Date Job",
    description: "Testing for an unsuccessful submit due to a past date.",
    date: "2020-01-01",
    time: "12:00",
    repeating: false,
    repeatingFrequency: null,
  });

  expect(response.status).toBe(400); // Adjust the status code based on your error handling
  expect(response.text).toContain("Date must be in the future");
});

it("should handle form submission errors for missing time", async () => {
  const response = await request(app).post("/form").send({
    title: "Test Missing Time Job",
    description: "Testing for an unsuccessful submit due to missing time.",
    date: "2025-01-01",
    repeating: false,
    repeatingFrequency: null,
  });

  expect(response.status).toBe(400); // Adjust the status code based on your error handling
  expect(response.text).toContain("Time is required");
});

it("should handle form submission errors for missing title and description", async () => {
  const response = await request(app).post("/form").send({
    // Invalid data to trigger an error
    date: "2025-01-01",
    time: "12:00",
    repeating: false,
    repeatingFrequency: null,
  });

  expect(response.status).toBe(400); // Adjust the status code based on your error handling
  expect(response.text).toContain("Title is required");
  expect(response.text).toContain("Description is required");
});

afterAll(async () => {
  await mongoose.disconnect();
});
