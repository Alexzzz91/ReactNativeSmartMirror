import React from 'react';
import { moment } from "../../Moment";

class Clock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  getTime() {
    const {
      dateParams,
      timeParams,
      secondsParams
    } = this.props;

    const now = moment();
    return {
      dateString: now.format(dateParams.format),
      time: now.format(`${timeParams.format} ${timeParams.useAmFormat}`),
      seconds: now.format(secondsParams.format),
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
