import React from 'react';
import { moment } from '../../Moment';


class Clock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  componentDidMount() {
    this.setTimer();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  getTime() {
    const {
      dateParams,
      timeParams,
      secondsParams,
    } = this.props;

    const now = moment();
    return {
      dateString: now.format(dateParams.format),
      time: now.format(timeParams.format),
      seconds: now.format(secondsParams.format),
    };
  }

  setTimer() {
    this.timeout = setTimeout(this.updateTime.bind(this), 1000);
  }

  updateTime() {
    this.setState(this.getTime, this.setTimer);
  }

  render() {
    const {
      dateString,
      time,
      seconds,
    } = this.state;

    const {
      dateParams,
      timeParams,
      secondsParams,
    } = this.props;

    return (
      <div style={{ ...styles.moduleClock }}>
        <span style={{ ...styles.dateClock }}>
          { dateParams.status && dateString }
        </span>
        <div style={{ ...styles.timeClock }}>
          <h2 style={{ ...styles.timeClockThin }}>
            { timeParams.status && time }
          </h2>
          <span style={{ ...styles.timeClockDimmed }}>
            { secondsParams.status && seconds }
          </span>
        </div>
        <span style={{ ...styles.weekClock }} />
      </div>
    );
  }
}

export {
  Clock as default,
  Clock,
};

const styles = {
  dateClock: {
    color: '#999',
    fontSize: '30px',
    lineHeight: '35px',
  },
  timeClock: {
    marginTop: '10px',
    fontFamily: 'OpenSans_light',
    fontWeight: '300',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  timeClockThin: {
    margin: 0,
    fontFamily: 'OpenSans_light',
    color: '#fff',
    fontWeight: '300',
    fontSize: '60px',
    lineHeight: '65px',
  },
  timeClockDimmed: {
    fontWeight: '300',
    fontSize: '30px',
    lineHeight: '32px',
    color: '#666',
  },
};
