const express = require("express");
const { eventEmitter } = require("../utils/notifyUser");

const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const listener = (job) => {
    res.write(`data: ${JSON.stringify(job)}\n\n`);
  };

  eventEmitter.on("jobDue", listener);

  res.on("close", () => {
    eventEmitter.off("jobDue", listener);
  });
});

module.exports = router;
