import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body || !req.body.url) {
      throw new Error('url address to ical required!');
    }

    const calendarUrl = req.body.url;
    const result = await fetch(calendarUrl);
    const innerCalendar = await result.text();
    res.status(200).send(innerCalendar);
  } catch (error) {
    res.status(504).send(error);
  }
});

export default router;
