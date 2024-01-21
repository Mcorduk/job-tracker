function toggleRepeatingFrequency() {
  const repeatingFrequencyContainer = document.getElementById(
    "repeatingFrequencyContainer",
  );
  if (document.getElementById("repeating").checked) {
    repeatingFrequencyContainer.style.display = "block";
  } else {
    repeatingFrequencyContainer.style.display = "none";
  }
}

function validateDateAndTime() {
  const dateInput = document.getElementById("dueDate");
  const errorSpan = document.getElementById("date-error");

  // Check if date is in the future or, if today, if time is later than current time
  if (
    selectedDate < now ||
    (selectedDate.toDateString() === now.toDateString() &&
      selectedDate.getTime() <= now.getTime())
  ) {
    errorSpan.textContent =
      "Date and time must be in the future or a later time today.";
    return false; // Prevent form submission
  }
  // Validation passed, clear any previous error message
  errorSpan.textContent = "";
  return true;
}
