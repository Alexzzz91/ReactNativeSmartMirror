import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.body || !req.body.url) {
      throw new Error('url address to lenta required!');
    }

    const letnaUrl = req.body.url;
    const result = await fetch(letnaUrl);
    console.log('result', result);
    const innerLenta = await result.text();
    res.type('application/xml').status(200).send(innerLenta);
  } catch (error) {
    res.status(504).send(error);
  }
});

export default router;
