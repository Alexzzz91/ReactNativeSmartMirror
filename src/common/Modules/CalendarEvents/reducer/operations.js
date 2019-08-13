import * as selectors from './selectors';
import * as Ical from '../../../Ical';
import {basic} from '../../../basic';

const loadByWebCall = (action) => (dispatch, getState) => {
  const { updateTime } = this.state;
  const now = moment();

  if (!!updateTime) {
    if (updateTime.diff(now, 'minutes') < 2) {
      return;
    }
  }


  const calendarEvents1 = Ical.parseICS(basic);

  this.setEvents(this.createEventList(calendarEvents1));

  // const calendarEvents2 = Ical.parseICS(basic2);

  // this.setEvents(this.createEventList(calendarEvents2));

  // const calendarEvents3 = Ical.parseICS(icloud);

  // this.setEvents(this.createEventList(calendarEvents3));

  webacalUrls.forEach((webacalUrl) => {
    fetch(webacalUrl)
    .then((response) => {
      this.setState({fetching: true});
      response.text().then((text) =>  {
        const calendarEvents = Ical.parseICS(text);

        this.setEvents(this.createEventList(calendarEvents));
      })
    })
    .catch(e => console.log(e))
  })
};

export {
    action,
};
