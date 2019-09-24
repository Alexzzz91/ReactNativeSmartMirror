import React from 'react';
import { moment } from '../../Moment';
import { getRandomInt } from './reducer/operations';

class Compliments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      complimentVariants: [],
      prevCompliment: '',
      compliment: '',
    };
  }

  componentDidMount() {
    this.getActualCompliment();
  }

  componentDidUpdate(prevProps, prevState) {
    const { weather } = this.props;
    const { compliment } = this.state;
    if (prevProps.weather === weather && prevState.compliment === compliment) {
      return;
    }

    this.getActualCompliment();
  }

  getActualCompliment = () => {
    const { weather, compliments } = this.props;

    const nowHour = moment().hour();

    let timeOfDay = 'day';

    Object.keys(compliments).forEach((item) => {
      const target = compliments[item];

      if (target.time_start <= nowHour && nowHour <= target.time_stop) {
        timeOfDay = item;
      }

      if (nowHour >= 0 || nowHour <= 6) {
        timeOfDay = 'night';
      }
    });


    let complimentVariants = compliments[timeOfDay][weather] || [];

    complimentVariants = complimentVariants.concat(compliments[timeOfDay].generic)

    let compliment = '';
    if (complimentVariants.length) {
      // eslint-disable-next-line prefer-destructuring
      compliment = complimentVariants[0];

      if (complimentVariants.length > 1) {
        compliment = complimentVariants[getRandomInt(0, complimentVariants.length)];
      }
    }

    this.setState({
      complimentVariants,
      compliment,
      prevCompliment: compliment,
    });
  }

  getRandomCompliment = (complimentVariants, prevCompliment) => {
    let newCompliment = prevCompliment;

    while (newCompliment === prevCompliment) {
      newCompliment = complimentVariants[getRandomInt(0, complimentVariants.length)];
    }

    return newCompliment;
  }

  changeCompliment = () => {
    const {
      complimentVariants,
      compliment,
      prevCompliment,
    } = this.state;

    if (complimentVariants.length < 2) {
      return;
    }

    const actiualCompliment = this.getRandomCompliment(complimentVariants, prevCompliment);

    this.setState({
      compliment: actiualCompliment,
      prevCompliment: compliment,
    });
  }

  render() {
    const { compliment } = this.state;

    return (
      <div>
        <div onClick={this.changeCompliment}>
          <span style={{ ...styles.bright }}>
            { compliment }
          </span>
        </div>
      </div>
    );
  }
};

export {
  Compliments
};

const styles = {
  bright: {
    fontFamily: "OpenSans_light",
    color: '#fff',
    fontWeight: "100",
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: '55px',
    lineHeight: '60px',
    marginTop: '5px',
  }
};
