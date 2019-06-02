import React from 'react';
import {
  Container, Content, Text, H1, H2, H3, Icon,
} from 'native-base';
import { DateTime } from 'luxon';
import { View, StyleSheet, Button, TouchableOpacity} from 'react-native';

// const webacalUrl = "https://p11-calendars.icloud.com/published/2/MTM2NzAyMjI0ODEzNjcwMqI5jWSNf6penKtjCEx88rFVTg69KSsCtgSKVETp7hBEmb0puBzTnV2NyhpyWCFxMIRN9wOvOEZliDRsVJxpIr8";
const webacalUrl = "https://calendar.google.com/calendar/ical/nlj3voogbgmajslig5dd9bppe8%40group.calendar.google.com/public/basic.ics";

class CalendarEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      accessToken: null,
      activeCalendar: null,
      calendars: [],
      events: [],
      name: null,
      photoUrl: null,
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.signUpdate = this.signUpdate.bind(this);
    this.setCalendars = this.setCalendars.bind(this);
  }

  componentDidMount() {
    this.getByWebCal();
  }

  getByWebCal = () => {
    fetch(webacalUrl)
      .then((response) => {
        response.text().then((text) =>  {
          var lines = text.split("\n");
          var events = [];
          var events_i = 0;
          for (i = 0; i < lines.length; i++) {
            if (lines[i].includes('DTSTART')) {
              var date = lines[i].split(":");
              events[events_i] = {date: date[1]};
            }
            else if (lines[i].includes('SUMMARY')) {
              var title = lines[i].split(":");
              events[events_i]["title"] = title[1];
            }
            else if (lines[i].includes('END:VEVENT')) {
              events_i++;
            }
          }

          this.setEvents(events.splice(0, 7));
        })
      })
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
    } else if (name === 'sign-out') {
      alert('kek');
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
      timeMin: DateTime.local().minus({ days: 1 }).toISO(),
      timeMax: DateTime.local().plus({ days: 7 }).toISO(),
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
      this.setEvents(responseJson.items);
    })
  }

  setEvents(events) {
    this.setState({
      events,
    });
  }

  render() {
    const now = DateTime.local();
    const {
      signedIn,
      calendars,
      activeCalendar,
      events,
    } = this.state;

    return (
        <Container style={{transition: 'opacity 1s ease 0s', opacity: 1}}>
          { !events.length  && !signedIn && (
            <Button
                onPress={(e) => this.handleItemClick(e, 'sign-in')}
                title="Авторизоваться в гугле"
                style={styles.button}
            />
          )}
          { !events.length && signedIn && (
            <Button
                onPress={(e) => this.handleItemClick(e, 'sign-out')}
                title="ИнАвторизоваться в гугле"
                style={styles.button}
            />
          )}
          { !events.length &&
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
                {events.map((event, i) => {
                  let date;

                  if (!!event.end && !!event.end.dateTime) {
                    date = DateTime.fromISO(event.end.dateTime).set({ year: now.year, month: now.month }).toRelative();
                  }

                  if (!!event.date) {
                    date = DateTime.fromISO(parseInt(event.date)).set({ year: now.year, month: now.month }).toRelative();
                  }

                  return (
                    <View
                      key={event.i + event.summary || event.title}
                      style={eventRowStyles(i)}
                    >
                      <View style={styles.eventRow}>
                        <Icon name="calendar" style={styles.eventIcon}/>
                        <Text style={styles.eventTitle}>
                          {event.summary || event.title }
                        </Text>
                        <Text style={styles.eventTime}>
                          { date }
                        </Text>
                      </View>
                    </View>
                  );
                }
                )}
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
    height: 25,
    width: 450,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventIcon: {
    width: 30,
    flex: 1,
    margin: 0,
    padding: 0,
    color: '#fff',
    justifyContent: 'center',
  },
  eventTitle: {
    width: 200,
    margin: 0,
    padding: 0,
    textAlign: 'left',
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

const eventRowStyles = (number) => StyleSheet.create({
  opacity: 1 / number,
  margin: 0,
  padding: 0,
});
