import React from 'react';
import { DateTime } from 'luxon';

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

class ModuleClock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  getTime() {
      var now = DateTime.local();
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
      <div className="module clock clock">
        <div className="module-content">
            <div className="date normal medium">
              { dateString }
            </div>
            <div className="time bright large light">
              { time }
              <sup className="dimmed">
                { seconds }
              </sup>
            </div>
            <div className="week dimmed medium" />
        </div>
      </div>
    );
  }
};

export {
  ModuleClock
};
