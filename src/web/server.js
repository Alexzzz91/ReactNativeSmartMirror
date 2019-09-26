import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import routeCalendar from './routes/calendar';
import routeLenta from './routes/lenta';
import { port as defaultPort } from '../config/url';
import { isDevelopment } from '../config/env';
import { joinPath } from '../utils/path';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

app.use(express.static('public'));
app.use(
  express.static(joinPath(!isDevelopment ? '' : 'build'), {
    setHeaders: (res) => {
      res.set('Service-Worker-Allowed', '/');
    },
  }),
);

app.use('/calendar', routeCalendar);
app.use('/lenta', routeLenta);

app.get('/', (_req, res) => {
  res.sendFile('index.html');
});

const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.info(`Running on ${port}...`);
});
