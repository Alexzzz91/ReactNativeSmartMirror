import express from 'express';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import routeCalendar from './routes/calendar';
import routeLenta from './routes/lenta';

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static('public'));

app.use('/calendar', routeCalendar);
app.use('/lenta', routeLenta);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.info(`Running on ${port}...`);
});
