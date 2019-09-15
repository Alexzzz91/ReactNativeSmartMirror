import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await fetch("https://calendar.google.com/calendar/ical/belalex.9132788%40gmail.com/public/basic.ics");
    const innerCalendar = await result.text();
    res.status(201).send(innerCalendar);

  } catch (error) {
    res.status(504).send(error);
  }
});

export default router;
