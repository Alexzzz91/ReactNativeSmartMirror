import React from 'react';
import {
  Container, Text, H3, Icon,
} from 'native-base';
import { DateTime } from 'luxon';
import moment from 'moment';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';
import { translate } from '../../../i18n';
import * as Ical from '../../../common/Ical';

// import DeviceInfo from 'react-native-device-info'
// const deviceLocale = DeviceInfo.getDeviceLocale()

// const webacalUrl = "https://p11-calendars.icloud.com/published/2/MTM2NzAyMjI0ODEzNjcwMqI5jWSNf6penKtjCEx88rFVTg69KSsCtgSKVETp7hBEmb0puBzTnV2NyhpyWCFxMIRN9wOvOEZliDRsVJxpIr8";
const webacalUrls = [
  'https://calendar.google.com/calendar/ical/nlj3voogbgmajslig5dd9bppe8%40group.calendar.google.com/public/basic.ics',
  // "ihttps://calendar.google.com/calendar/ical/belalex.9132788%40gmail.com/public/basic.ics"
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
  }

  componentDidMount() {
    this.getByWebCal();
    setInterval(this.getByWebCal, 60000);
  }

  getByWebCal = () => {
    const { updateTime } = this.state;
    const now = moment();

    if (updateTime) {
      if (updateTime.diff(now, 'minutes') < 2) {
        return;
      }
    }
    webacalUrls.forEach((webacalUrl) => {
      fetch(webacalUrl).then((response) => {
        this.setState({ fetching: true });
        response.text().then((text) => {
          const calendarEvents = Ical.parseICS(text);

          this.setEvents(this.createEventList(calendarEvents));
        });
      });
    });
  }

  signUpdate(signedIn, accessToken) {
    this.setState({
      signedIn,
      accessToken,
    });
  }

  handleItemClick(event, name) {
    if (name === 'sign-in') {
      this.signIn();
    }
  }

  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "953730147082-0jif2bi0mtp1s98reealp9jdhl91t4le.apps.googleusercontent.com",
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scopes: [
          "profile",
          "email",
          "https://www.googleapis.com/auth/calendar.readonly",
          "https://www.googleapis.com/auth/calendar",
        ]
      })
      if (result.type === "success") {
        this.signUpdate(true, result.accessToken);
        this.getCalendars();
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  getCalendars = async () => {
    const { accessToken } = this.state;
    fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setCalendars(responseJson.items);
      })
  }

  setCalendars(calendars) {
    this.setState({
      calendars,
    })
  };

  setActiveCalendars(activeCalendar) {
    this.setState({
      activeCalendar,
    }, () => this.getEvents(activeCalendar.id))
  };

  getEvents = async (id) => {
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
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log('responseJson.items', responseJson.items);
      this.setEvents(responseJson.items);
    })
  }

  capFirst = (string) => string.slice(0, 1) + string.slice(1).toLowerCase()

  setEvents(newEvents) {
    // console.log('newEvents', newEvents);
    let now = moment();
    const { events } = this.state;
    const { config } = this.props;

    newEvents = newEvents.map((event) => {
      // Define second, minute, hour, and day variables
      const oneSecond = 1000; // 1,000 milliseconds
      const oneMinute = oneSecond * 60;
      const oneHour = oneMinute * 60;
      const oneDay = oneHour * 24;
      let date;
      if (event.fullDayEvent) {
        event.end -= oneSecond;
        if (event.today) {
          date = translate(this.capFirst("TODAY"));
          // console.log('1');
        } else if (event.start - now < oneDay && event.start - now > 0) {
          date = translate(this.capFirst("TOMORROW"));
          // console.log('2');
        } else if (event.start - now < 2 * oneDay && event.start - now > 0) {
            date = this.capFirst(moment(event.start, "x").fromNow());
            // console.log('3');
        } else {
          if (config.timeFormat === "absolute") {
            if ((config.urgency > 1) && (event.startDate - now < (config.urgency * oneDay))) {
              // This event falls within the config.urgency period that the user has set
              date = this.capFirst(moment(event.startDate, "x").from(moment().format("YYYYMMDD")));
              // console.log('4');
            } else {
              date = this.capFirst(moment(event.startDate, "x").format(config.fullDayEventDateFormat));
              // console.log('5');
            }
          } else {
            date = this.capFirst(moment(event.startDate, "x").from(moment().format("YYYYMMDD")));
            // console.log('6');
          }
        }
        if(config.showEnd){
          date += "-" ;
          date += this.capFirst(moment(event.end  , "x").format(config.fullDayEventDateFormat));
        }
      } else {
        const startDate =  moment(event.start);
        if (startDate >= moment()) {
          if (event.startDate - now < 2 * oneDay) {
            // This event is within the next 48 hours (2 days)
            if (event.startDate - now < config.getRelative * oneHour) {
              // If event is within 6 hour, display 'in xxx' time format or moment.fromNow()
              date = this.capFirst(moment(event.start, "x").fromNow());
            } else {
              if(config.timeFormat === "absolute") {
                date = this.capFirst(moment(event.start, "x").format(config.dateFormat));
              } else {
                // Otherwise just say 'Today/Tomorrow at such-n-such time'
                date = this.capFirst(moment(event.start, "x").calendar());
              }
            }
          } else {
            if (config.timeFormat === "absolute") {
              if ((config.urgency > 1) && (event.startDate - now < (config.urgency * oneDay))) {
                // This event falls within the config.urgency period that the user has set
                date = this.capFirst(moment(event.start, "x").fromNow());
              } else {
                date = this.capFirst(moment(event.start, "x").format(config.dateFormat));
              }
            } else {
              date = this.capFirst(moment(event.start, "x").fromNow());
            }
          }
        } else if(moment(event.end) > moment()) {
          date = translate(this.capFirst("RUNNING"));
        }
        if (config.showEnd && moment(event.end) > moment()) {
          date += "-";
          date += this.capFirst(moment(event.end, "x").format(config.dateEndFormat));
        }
      }

      const summary = event.summary || event.title;

      if (!summary || !date) {
        return;
      }

      return {
        summary: event.summary || event.title,
        location: event.location,
        date,
      }
    })
    .filter(Boolean);

    const sortedNewEvents = events.concat(newEvents).sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
    });

    this.setState({
      events: sortedNewEvents,
      fetching: false,
      updateTime: moment()
    });
  }

  createEventList = (calendarData) => {
    const { config } = this.props;

    const now = moment();
    let events = [];
    for (const c in calendarData) {
      const event = calendarData[c];

      if(config.hidePrivate) {
        if(event.class === "PRIVATE") {
            // do not add the current event, skip it
            continue;
        }
      }

      if(config.hideOngoing) {
        if(event.start < now) {
          continue;
        }
      }

      if (event.nextRecurrence && event.nextRecurrence.length) {
        event.nextRecurrence.forEach((dateTime) => {
          const newEvent = {...event};
          newEvent.start = moment(dateTime);
          events.push(newEvent);
        })
      };

      events.push(event);
    }
    // console.log('events', events);
    events = events.sort((a, b) => b.start - a.start);

    return events;
  }

  listContainsEvent = (eventList, event) => {
    for(var evt of eventList){
      if(evt.title === event.title && parseInt(evt.startDate) === parseInt(event.startDate)){
        return true;
      }
    }
    return false;

  }



  render() {
    const now = DateTime.local();
    const {
      signedIn,
      calendars,
      activeCalendar,
      events,
      fetching,
    } = this.state;

    return (
        <Container style={{transition: 'opacity 1s ease 0s', opacity: 1}}>
          { !events.length  && !signedIn && !fetching && (
            <Button
                onPress={(e) => this.handleItemClick(e, 'sign-in')}
                title="Авторизоваться в гугле"
                style={styles.button}
            />
          )}
          { !events.length && !fetching &&
            <View style={styles.eventRows}>
              <Text> Выбери календарь </Text>
              {calendars.map((calendar, i) =>
                <View key={calendar.id+i}>
                  <View style={styles.eventRow}>
                    <Icon name="calendar" style={styles.eventIcon}/>
                    <TouchableOpacity
                      onPress={() => this.setActiveCalendars(calendar)}
                      style={styles.calendarTitle}
                    >
                      <Text> {calendar.summary} </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          }
          {!!events.length && (
            <>
              <H3 style={styles.header}>События</H3>
              <View style={styles.eventRows}>
                <VirtualizedList
                  data={events}
                  initialNumberToRender={5}
                  windowSize={150}
                  getItemCount={() => events.length}
                  getItem={(data, index) => {
                      const event = data[index];
                      // console.log('event.date', event.date);
                      return {
                        summary: event.summary.trim(),
                        location: event.location && event.location.trim(),
                        date: event.date.trim(),
                        index
                      };
                  }}
                  keyExtractor={(item, index) => index + item.summary}
                  renderItem={({item, index}) => (
                      <View
                        style={eventRowStyles(index, !!item.location)}
                      >
                        <View style={styles.eventRow}>
                          <Icon name="calendar" style={styles.eventIcon}/>
                          <View style={styles.eventMiddleRow}>
                            <Text style={styles.eventTitle}>
                              { item.summary }
                            </Text>
                          </View>
                          <Text style={styles.eventTime}>
                            { item.date }
                          </Text>
                        </View>
                        { !!item.location && (
                          <View style={styles.locationMiddleRow}>
                              <React.Fragment>
                                <Icon name="md-pin" size={15} style={styles.locationIcon}/>
                                <Text style={styles.eventLocation} numberOfLines={1}>
                                  { item.location.substr(0, 60) }
                                </Text>
                              </React.Fragment>
                          </View>
                        )}
                      </View>
                  )}
                />
              </View>
            </>
          )}
          {signedIn &&
           !!activeCalendar &&
            !events.length && (
            <H3 className="module-header">Ближайших событий нет</H3>
          )}
        </Container>
    );
  }
};

export {
  CalendarEvents
};

const styles = StyleSheet.create({
  eventRows: {
    flex: 1,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  eventRow: {
    minHeight: 25,
    width: 450,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationMiddleRow: {
    width: 450,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  eventMiddleRow: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  eventIcon: {
    width: 25,
    fontSize: 24,
    flex: 1,
    margin: 0,
    padding: 0,
    color: '#fff',
    justifyContent: 'center',
  },
  locationIcon: {
    width: 26,
    height: 18,
    fontSize: 12,
    marginRight: 24,
    padding: 0,
    color: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    width: 200,
    margin: 0,
    padding: 0,
    textAlign: 'left',
    justifyContent: 'center',
  },
  eventLocation : {
    fontSize: 12,
    color: '#fbf6f6',
    textAlign: 'center',
    justifyContent: 'center',
  },
  calendarTitle: {
    width: 250,
  },
  eventTime: {
    width: 200,
    margin: 0,
    padding: 0,
    textAlign: 'right',
    justifyContent: 'center',
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: "Roboto_condensed_light",
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    lineHeight: 25,
    paddingBottom: 8,
    marginBottom: 2,
    marginTop: 2,
    color: '#999',
  }
});

const eventRowStyles = (number, hasLocation) => {
  if (number < 5) {
    number = number/1.5;
  } else {
    number = 5;
  }
  return StyleSheet.create({
    opacity: 1 / number,
    minHeight: hasLocation ? 35 : 25,
    margin: 0,
    padding: 0,
  })
};
