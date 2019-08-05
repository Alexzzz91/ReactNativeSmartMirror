import React from 'react';
import moment from "moment";
import 'moment/locale/en-gb';
// import momentRU from 'moment/locale/ru';

// import DeviceInfo from 'react-native-device-info'
// const deviceLocale = DeviceInfo.getDeviceLocale()

// const dayFormat = {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric',
// };

// const timeFormat = {
//   hour: 'numeric',
//   minute: '2-digit',
// };

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
    // moment.updateLocale('ru', momentRU);
  }

  getTime() {
      const now = moment();
      return {
        dateString: now.format("dddd, MMMM Do YYYY"),
        time: now.format('hh:mm A'),
        seconds: now.format('ss'),
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
      <div style={{...styles.moduleClock}}>
        <span style={{...styles.dateClock}}>
          { dateString }
        </span>
        <div style={{...styles.timeClock}}>
          <h2 style={{...styles.timeClockThin}}>
            { time }
          </h2>
          <span style={{...styles.timeClockDimmed}}>
            { seconds }
          </span>
        </div>
        <span style={{...styles.weekClock}}>
        </span>
      </div>
    );
  }
};

export {
  Clock
};

const styles = {
  moduleClock: {

  },
  dateClock: {
    color: '#999',
    fontSize: '30px',
    lineHeight: '35px',
  },
  timeClock: {
    marginTop: '10px',
    fontFamily: "OpenSans_light",
    fontWeight: "300",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  timeClockThin: {
    margin: 0,
    fontFamily: "OpenSans_light",
    color: '#fff',
    fontWeight: "300",
    fontSize: '60px',
    lineHeight: '65px',
  },
  timeClockDimmed: {
    fontWeight: "300",
    fontSize: '30px',
    lineHeight: '32px',
    color: '#666',
  },
  weekClock:{
  },
};
