const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

/* GET form page. */
router.get("/form", (req, res, next) => {
  const now = new Date();
  const minDate = now.toISOString().split("T")[0]; // Extract only the date part
  const maxDate = new Date(
    now.getFullYear() + 10,
    now.getMonth(),
    now.getDate(),
  )
    .toISOString()
    .split("T")[0]; // Extract the date part

  res.render("form", { minDate, maxDate });
});

module.exports = router;
