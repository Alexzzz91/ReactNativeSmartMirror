import React from 'react';
import { Link } from 'react-router-dom';

import { Clock } from './Modules/Clock';
import { CalendarEvents } from './Modules/CalendarEvents';
import { Weather } from './Modules/Weather';
import { Compliments } from './Modules/Compliments';
import { Lenta } from './Modules/Lenta';

import moment from "moment";
// import { translate } from '../../i18n';
import 'moment/locale/en-gb';
import momentRU from 'moment/locale/ru';

import { API_KEY } from '../../common/WeatherAPIKey'

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
      showTextTime: false,
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
  }

  componentDidMount() {
    moment.updateLocale('ru', momentRU);
    this.fetchWeather();
    setInterval(this.fetchWeather, 60000);
  }

  fetchAsync = async (url) => {
    let response = await fetch(url);
    let data = await response.json();

    return data;
  }

  fetchWeather = () => {
    const { updateTime } = this.state;
    const now = moment();

    if (!!updateTime) {
      if (updateTime.diff(now, 'minutes') < 2) {
        return;
      }
    }

    this.setState({ isLoading: true});

    try {
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}&units=metric&lang=ru&q=Moscow,RU`)
      .then(({list}) => {
        let item;
        let weatherCondition;
        const days = [];
        for(let i = 0; i < list.length; i++) {
          item = list[i];
          weatherCondition = item.weather[0].main;
          const dateTime = moment(item.dt_txt);
          const day = dateTime.format('ddd')
          if(!days[day]) {
            days.push({
              weatherCondition,
              tempMax: Math.ceil(item.main.temp_max.toFixed(1)),
              tempMin: Math.ceil(item.main.temp_min.toFixed(1)),
              date: day,
            });
            days[day] = true;
          }
        };
        this.setState({days});
      })
      .catch(reason => console.log(reason.message))
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&units=metric&lang=ru&q=Moscow,RU`)
        .then((item) => {
          let temperature;
          let weatherCondition;
          let weatherDescription;
          temperature = item.main.temp;
          weatherCondition = item.weather[0].main;
          weatherDescription = item.weather[0].description;
          this.setState({
            temperature: Math.ceil(temperature.toFixed(1)),
            weatherCondition,
            weatherDescription,
            // @TODO пофиксить
            city: 'Москве',
            isLoading: false
          });
        })
        .catch(reason => console.log(reason.message))
    } catch (e) {
      console.log("error", e)
    }

    this.setState({
      updateTime: moment()
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

    return (
      <div style={{...styles.container}}>
        <div style={{...styles.topRow}}>
          <div style={{...styles.topRows}}>
            <Clock/>
            <CalendarEvents config={this.config}/>
          </div>
          <div style={{...styles.settingsButtonView}}>
            <Link
              style={{...styles.settingsButton}}
              to='/settings'
            >
              Settings
            </Link>
          </div>
          <div>
            {isLoading ?
              (
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
        <div style={{...styles.middleRow}}>
          {isLoading
              ? (
                <span>
                  Загружаются данные о погоде
                </span>
              ) : (
                <Compliments weather={weatherCondition}/>
          )}
        </div>
        <div style={{...styles.footerRow}}>
          <Lenta />
        </div>
      </div>
    )
  }
}

export default Home;

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#000',
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
  footerRow:{
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
    width: '140px',
    height: '20px'
  },
  settingsButton: {
    opacity: 0.5
  },
};
