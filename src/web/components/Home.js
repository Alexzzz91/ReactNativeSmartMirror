import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ClockWeb as Clock } from '../../common/Modules/Clock';
import { CalendarEventsWeb as CalendarEvents } from '../../common/Modules/CalendarEvents';
import { WeatherWeb as Weather } from '../../common/Modules/Weather';
import { ComplimentsWeb as Compliments } from '../../common/Modules/Compliments';
import { LentaWeb as Lenta } from '../../common/Modules/Lenta';
import { FaceWeb as Face } from '../../common/Modules/FaceApi';
import { translate } from '../../i18n';

import { moment } from '../../common/Moment';

import { API_KEY } from '../../common/WeatherAPIKey';

/*
import { TextClock } from './TextClock';
import { ModuleClock } from './ModuleClock';
import { ModuleCalendarEvents } from './ModuleCalendarEvents';
*/

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      weatherCondition: null,
      temperature: null,
      weatherDescription: null,
      days: [],
      city: null,
    };

    this.config = {
      hidePrivate: false,
      hideOngoing: false,
      maximumNumberOfDays: 365,
      sliceMultiDayEvents: true,
      showEnd: false,
      dateFormat: 'MMM Do',
      dateEndFormat: 'HH:mm',
      urgency: 7,
      timeFormat: 'absolute',
    };

    this.styles = getStyles({ font: props.fonts.current });
  }

  componentDidMount() {
    this.fetchWeather();
    setInterval(this.fetchWeather, 60000);
  }

  componentDidUpdate(prevProps) {
    const { fonts } = this.props;

    if (prevProps.fonts.current !== fonts.current) {
      this.styles = getStyles({ font: fonts.current });
    }
  }

  fetchAsync = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  fetchWeather = () => {
    const { updateTime } = this.state;
    const now = moment();

    if (updateTime) {
      if (updateTime.diff(now, 'minutes') < 2) {
        return;
      }
    }

    this.setState({ isLoading: true });

    try {
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&lang=ru&q=Moscow,RU`)
        .then(({ list }) => {
          let item;
          let weatherCondition;
          const days = [];
          for (let i = 0; i < list.length; i += 1) {
            item = list[i];
            weatherCondition = item.weather[0].main;
            const dateTime = moment(item.dt_txt);
            const day = dateTime.format('ddd');
            if (!days[day]) {
              days.push({
                weatherCondition,
                tempMax: Math.ceil(item.main.temp_max.toFixed(1)),
                tempMin: Math.ceil(item.main.temp_min.toFixed(1)),
                date: day,
              });
              days[day] = true;
            }
          }
          this.setState({ days });
        })
        .catch(reason => console.log(reason.message));
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric&lang=ru&q=Moscow,RU`)
        .then((item) => {
          const temperature = item.main.temp;
          const weatherCondition = item.weather[0].main;
          const weatherDescription = item.weather[0].description;
          this.setState({
            temperature: Math.ceil(temperature.toFixed(1)),
            weatherCondition,
            weatherDescription,
            // @TODO пофиксить
            city: 'Москве',
            isLoading: false,
          });
        })
        .catch(reason => console.log(reason.message));
    } catch (e) {
      console.log('error', e);
    }

    this.setState({
      updateTime: moment(),
    });
  }


  render() {
    const {
      isLoading,
      weatherCondition,
      temperature,
      weatherDescription,
      days,
      city,
    } = this.state;

    const { locale } = this.props;
    // console.log('this.props', this.props);
    const { styles } = this;

    return (
      <div style={{ ...styles.container }}>
        <div style={{ ...styles.topRow }}>
          <div style={{ ...styles.topRows }}>
            <Clock />
            <CalendarEvents config={this.config} />
          </div>
          <div style={{ ...styles.settingsButtonView }}>
            <Link
              style={{ ...styles.settingsButton }}
              to="/settings"
            >
              {translate('Settings', locale)}
            </Link>
          </div>
          <div>
            {isLoading ? (
              <span>
                Загружаются данные о погоде
              </span>
            ) : (
              <Weather
                weather={weatherCondition}
                temperature={temperature}
                description={weatherDescription}
                days={days}
                city={city}
              />
            )}
          </div>
        </div>
        <div style={{ ...styles.middleRow }}>
          {isLoading
            ? (
              <span>
                Загружаются данные о погоде
              </span>
            ) : (
              <Compliments weather={weatherCondition}/>
            )}
        </div>
        <div style={{ ...styles.footerRow }}>
          <Lenta />
        </div>
        <Face />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.common.locale,
  fonts: state.common.fonts,
});

const ConnectedHome = connect(mapStateToProps)(Home);

export {
  ConnectedHome as default,
  ConnectedHome as Home,
};


const getStyles = options => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    textShadow: '0 0 15px rgba(255,255,255,.5), 0 0 10px rgba(255,255,255,.5)',
    fontFamily: !!options && !!options.font ? options.font : 'AvenirNextCyr',
  },
  topRow: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRows: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  middleRow: {
    flex: 2,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  footerRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: '10px',
  },
  settingsButtonView: {
    opacity: 0.3,
    width: '140px',
    height: '20px',
    color: 'white',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '5px',
    padding: '4px 5px',
    border: '1px white solid',
  },
  settingsButton: {
    color: 'white',
    margin: 'auto',
  },
});
