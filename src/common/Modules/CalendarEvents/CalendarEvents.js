import React from 'react';
import {VariableSizeList as List, shouldComponentUpdate } from 'react-window';
import { Scrollbars } from 'react-custom-scrollbars';
import { moment } from '../../Moment';
import { translate } from '../../../i18n';

import * as Ical from '../../Ical';

const webcalUrls = [
  'https://p11-calendars.icloud.com/published/2/MTM2NzAyMjI0ODEzNjcwMqI5jWSNf6penKtjCEx88rFVTg69KSsCtgSKVETp7hBEmb0puBzTnV2NyhpyWCFxMIRN9wOvOEZliDRsVJxpIr8',
  'https://calendar.google.com/calendar/ical/nlj3voogbgmajslig5dd9bppe8%40group.calendar.google.com/public/basic.ics',
  'https://calendar.google.com/calendar/ical/belalex.9132788%40gmail.com/public/basic.ics'
];

class CalendarEvents extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      signedIn: false,
      accessToken: null,
      activeCalendar: null,
      calendars: [],
      events: [],
      updateTime: null,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.signUpdate = this.signUpdate.bind(this);
    this.setCalendars = this.setCalendars.bind(this);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.getByWebCal();
    setInterval(this.getByWebCal, 60000);
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props;
    if (prevProps.locale !== locale) {
      this.forceUpdate();
    }
  }

  getByWebCal = () => {
    const { updateTime } = this.state;
    const now = moment();

    if (updateTime) {
      if (updateTime.diff(now, 'minutes') < 2) {
        return;
      }
    }

    webcalUrls.forEach((webcalUrl) => {
      const body = { url: webcalUrl };
      fetch('http://localhost:1337/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          this.setState({ fetching: true });
          response.text().then((text) => {
            const calendarEvents = Ical.parseICS(text);

            this.setEvents(this.createEventList(calendarEvents));
          });
        })
        .catch(e => console.error(e));
    });
  }

  signUpdate(signedIn, accessToken) {
    this.setState({
      signedIn,
      accessToken,
    });
  }

  handleItemClick(_event, name) {
    if (name === 'sign-in') {
      this.signIn();
    }
  }

  signIn = async () => {
    try {
      // const result = await Expo.Google.logInAsync({
      //   androidClientId: "953730147082-0jif2bi0mtp1s98reealp9jdhl91t4le.apps.googleusercontent.com",
      //   discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      //   scopes: [
      //     "profile",
      //     "email",
      //     "https://www.googleapis.com/auth/calendar.readonly",
      //     "https://www.googleapis.com/auth/calendar",
      //   ]
      // })
      // if (result.type === "success") {
      //   this.signUpdate(true, result.accessToken);
      //   this.getCalendars();
      // } else {
      //   console.log("cancelled")
      // }
    } catch (e) {
      console.log("error", e)
    }
  }

  getCalendars = async () => {
    const { accessToken } = this.state;
    fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setCalendars(responseJson.items);
      });
  }

  setCalendars(calendars) {
    this.setState({
      calendars,
    });
  }

  setActiveCalendars(activeCalendar) {
    this.setState({
      activeCalendar,
    }, () => this.getEvents(activeCalendar.id));
  }

  getEvents = async () => {
    const vars = {
      timeMin: moment().subtract(1, 'days').toISOString(),
      timeMax: moment().add(7, 'days').toISOString(),
    };

    const queries = `maxResults=50&timeMin=${encodeURIComponent(vars.timeMin)}&timeMax=${encodeURIComponent(vars.timeMax)}`;
    const {
      accessToken,
      activeCalendar,
    } = this.state;

    fetch(`https://content.googleapis.com/calendar/v3/calendars/${activeCalendar.id}/events?${queries}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('responseJson.items', responseJson.items);
      this.setEvents(responseJson.items);
    });
  }

  capFirst = string => string.slice(0, 1) + string.slice(1).toLowerCase()

  setEvents(rawEvents) {
    const now = moment();
    const { events } = this.state;
    const { settings } = this.props;

    const newEvents = rawEvents.map((event) => {
      if (!event || !event.start) {
        return null;
      }
      // Define second, minute, hour, and day variables
      const oneSecond = 1000; // 1,000 milliseconds
      const oneMinute = oneSecond * 60;
      const oneHour = oneMinute * 60;
      const oneDay = oneHour * 24;
      let date;
      let eventMoment;
      if (event.fullDayEvent) {
        event.end -= oneSecond;
        if (event.today) {
          date = translate(this.capFirst('TODAY'));
        } else if (event.start - now < oneDay && event.start - now > 0) {
          date = translate(this.capFirst('TOMORROW'));
        } else if (event.start - now < 2 * oneDay && event.start - now > 0) {
          date = this.capFirst(moment(event.start, 'x').fromNow());
        } else {
          if (settings.timeFormat === 'absolute') {
            if ((settings.urgency > 1) && (event.start - now < (settings.urgency * oneDay))) {
              // This event falls within the settings.urgency period that the user has set
              date = this.capFirst(moment(event.start, "x").from(moment().format('YYYYMMDD')));
            eventMoment = event.start;
            } else {
              date = this.capFirst(moment(event.start, "x").format(settings.fullDayEventDateFormat));
            eventMoment = event.start;
            }
          } else {
            date = this.capFirst(moment(event.start, "x").from(moment().format('YYYYMMDD')));
            eventMoment = event.start;
          }
        }
        if (settings.showEnd) {
          date += '-';
          date += this.capFirst(moment(event.end, 'x').format(settings.fullDayEventDateFormat));
        }
      } else {
        const start = moment(event.start);
        if (start >= moment()) {
          if (event.start - now < 2 * oneDay) {
            // This event is within the next 48 hours (2 days)
            if (event.start - now < settings.getRelative * oneHour) {
              // If event is within 6 hour, display 'in xxx' time format or moment.fromNow()
              date = this.capFirst(moment(event.start, 'x').fromNow());
              eventMoment = event.start;
            } else {
              if (settings.timeFormat === 'absolute') {
                date = this.capFirst(moment(event.start, "x").format(settings.dateFormat));
                eventMoment = event.start;
              } else {
                // Otherwise just say 'Today/Tomorrow at such-n-such time'
                date = this.capFirst(moment(event.start, "x").fromNow());
                eventMoment = event.start;
              }
            }
          } else {
            if (settings.timeFormat === 'absolute') {
              if ((settings.urgency > 1) && (event.start - now < (settings.urgency * oneDay))) {
                // This event falls within the settings.urgency period that the user has set
                date = this.capFirst(moment(event.start, 'x').fromNow());
                eventMoment = event.start;
              } else {
                date = this.capFirst(moment(event.start, 'x').format(settings.dateFormat));
                eventMoment = event.start;
              }
            } else {
              date = this.capFirst(moment(event.start, 'x').fromNow());
              eventMoment = event.start;
            }
          }
        } else if(moment(event.end) > moment()) {
          date = translate(this.capFirst('RUNNING'));
          eventMoment = event.start;
        }
        if (settings.showEnd && moment(event.end) > moment()) {
          date += '-';
          date += this.capFirst(moment(event.end, 'x').format(settings.dateEndFormat));
        }
      }

      const summary = event.summary || event.title;

      if (!summary || !date) {
        return null;
      }

      return {
        summary: event.summary || event.title,
        location: event.location,
        date,
        eventMoment,
      };
    })
      .filter(Boolean);

    const sortedNewEvents = events.concat(newEvents).sort((a, b) => a.eventMoment - b.eventMoment);

    this.setState({
      events: sortedNewEvents,
      fetching: false,
      updateTime: moment(),
    });
  }

  createEventList = (calendarData) => {
    const { settings } = this.props;

    const now = moment();
    let events = [];

    for (const c in calendarData) {
      const event = calendarData[c];

      if(settings.hidePrivate) {
        if(event.class === "PRIVATE") {
            // do not add the current event, skip it
            continue;
        }
      }

      if(settings.hideOngoing) {
        if(event.start < now) {
          continue;
        }
      }

      if (event.nextRecurrence && event.nextRecurrence.length) {
        for (const dateTime in event.nextRecurrence) {
          const newEvent = {...event};
          newEvent.start = moment(dateTime);
          events.push(newEvent);
        };
      };

      events.push(event);
    }
    events = events.sort((a, b) => b.start - a.start);

    return events;
  }

  getItemSize = (index) => {
    const { events } = this.state;
    return events[index].location ? 150 : 55;
  };

  getRow = ({ index, style }) => {
    const { events } = this.state;
    const item = events[index];

    return (
      <div style={{ ...style, ...eventRowStyles(index + 1, !!item.location) }}>
        <div style={{ ...styles.eventRow }}>
          <i
            className="icon-calendar"
            style={{ ...styles.eventIcon }}
          />
          <div style={{ ...styles.eventMiddleRow }}>
            <span style={{ ...styles.eventTitle }}>
              { item.summary }
            </span>
          </div>
          <span style={{ ...styles.eventTime }}>
            { item.date }
          </span>
        </div>
        {!!item.location && (
          <div style={{ ...styles.locationMiddleRow }}>
              <>
                <i
                  className="icon-pin"
                  style={{ ...styles.locationIcon }}
                />
                <span style={{ ...styles.eventLocation }}>
                  { item.location.substr(0, 60) }
                </span>
              </>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { locale } = this.props;
    const {
      signedIn,
      calendars,
      activeCalendar,
      events,
      fetching,
    } = this.state;

    return (
      <div style={{ transition: 'opacity 1s ease 0s', opacity: 1 }}>
        { !events.length && !signedIn && !fetching && (
          <button
            type="button"
            onClick={e => this.handleItemClick(e, 'sign-in')}
            style={{ ...styles.button }}
          >
            Авторизоваться в гугле
          </button>
        )}
        { !events.length && !fetching && (
          <div style={{ ...styles.eventRows }}>
            <span>
              { translate('Change Calendar', locale) }
            </span>
            {calendars.map(calendar => (
              <div key={calendar.id}>
                <div style={{ ...styles.eventRow }}>
                  <i
                    className="icon-calendar"
                    style={{ ...styles.eventIcon }}
                  />
                  <div
                    onClick={() => this.setActiveCalendars(calendar)}
                    style={{ ...styles.calendarTitle }}
                  >
                    <span>
                      { calendar.summary }
                    </span>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
        )}
        {!!events.length && (
          <>
            <h3 style={{ ...styles.header }}>
              {translate('Events', locale)}
            </h3>
            <div style={{ ...styles.eventRows }}>
              <Scrollbars
                style={{
                  width: 525,
                  height: 250,
                }}
              >
                <List
                  height={250}
                  itemCount={events.length}
                  itemSize={this.getItemSize}
                  width={550}
                >
                  {this.getRow}
                </List>
              </Scrollbars>
            </div>
          </>
        )}
        {signedIn &&
          !!activeCalendar &&
          !events.length && (
          <h3 className="module-header">Ближайших событий нет</h3>
        )}
      </div>
    );
  }
}

export {
  CalendarEvents as default,
  CalendarEvents,
};

const styles = {
  eventRows: {
    flex: 1,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: '1px',
  },
  eventRow: {
    minHeight: '35px',
    width: '500px',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationMiddleRow: {
    width: '450px',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  eventMiddleRow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  eventIcon: {
    width: '25px',
    fontSize: '24px',
    margin: 0,
    padding: 0,
    color: '#fff',
    justifyContent: 'center',
  },
  locationIcon: {
    width: '26px',
    height: '18px',
    fontSize: '12px',
    marginRight: '24px',
    padding: 0,
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    width: '200px',
    margin: 0,
    padding: 0,
    textAlign: 'left',
    justifyContent: 'center',
  },
  eventLocation: {
    fontSize: '12px',
    marginLeft: '26px',
    color: '#fbf6f6',
    textAlign: 'center',
    justifyContent: 'center',
  },
  calendarTitle: {
    width: '250px',
  },
  eventTime: {
    width: '200px',
    margin: 0,
    padding: 0,
    textAlign: 'right',
    justifyContent: 'center',
  },
  header: {
    textTransform: 'uppercase',
    fontSize: '20px',
    fontFamily: 'Roboto_condensed_light',
    fontWeight: '400',
    borderBottomWidth: '1px',
    borderBottomColor: '#666',
    lineHeight: '25px',
    paddingBottom: '8px',
    marginBottom: '2px',
    marginTop: '2px',
    color: '#999',
  },
};

const eventRowStyles = (number, hasLocation) => {
  let opacity;
  if (number < 5) {
    opacity = number / 1.5;
  } else {
    opacity = 5;
  }
  return {
    opacity: 1 / opacity,
    minHeight: hasLocation ? '55px' : '35px',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };
};
