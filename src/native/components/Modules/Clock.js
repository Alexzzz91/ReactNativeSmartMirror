import React from 'react';
import { DateTime } from 'luxon';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { View, StyleSheet } from 'react-native';

const dayFormat = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
};

const timeFormat = {
  hour: 'numeric',
  minute: '2-digit',
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  getTime() {
      const now = DateTime.local().setLocale('ru-ru');
      return {
        dateString: now.toLocaleString(dayFormat),
        time: now.toLocaleString(timeFormat),
        seconds: now.toFormat('ss'),
      };
  }

  setTimer() {
    this.timeout = setTimeout(this.updateTime.bind(this), 1000);
  }

  updateTime() {
    this.setState(this.getTime, this.setTimer);
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const {
      dateString,
      time,
      seconds,
    } = this.state;

    return (
      <View style={styles.moduleClock}>
        <Text style={styles.dateClock}>
          { dateString }
        </Text>
        <View style={styles.timeClock}>
          <H2 style={styles.timeClockThin}>
            { time }
          </H2>
          <Text style={styles.timeClockDimmed}>
            { seconds }
          </Text>
        </View>
        <Text style={styles.weekClock}>
        </Text>
      </View>
    );
  }
};

export {
  Clock
};



const styles = StyleSheet.create({
  moduleClock: {

  },
  dateClock: {
    color: '#999',
    fontSize: 30,
    lineHeight: 35,
  },
  timeClock: {
    marginTop: 10,
    fontFamily: "OpenSans_light",
    fontWeight: "100",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  timeClockThin: {
    fontFamily: "OpenSans_light",
    color: '#fff',
    fontWeight: "100",
    fontSize: 60,
    lineHeight: 65,
  },
  timeClockDimmed: {
    fontWeight: "100",
    fontSize: 30,
    lineHeight: 32,
    color: '#666',
  },
  weekClock:{
  },
});
