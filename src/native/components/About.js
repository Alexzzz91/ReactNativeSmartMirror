import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { View, StyleSheet } from 'react-native';
import { Clock } from './Modules/Clock';
import { CalendarEvents } from './Modules/CalendarEvents';
import { Weather } from './Modules/Weather';
import { Compliments } from './Modules/compliments/Compliments';
import { Lenta } from './Modules/Lenta';
import { Constants, Location, Permissions } from 'expo';
import { DateTime } from 'luxon';
import { API_KEY } from './Modules/WeatherAPIKey'

class About extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    weatherDescription: null,
    days: [],
    city: null,
    error: null
  }

  componentDidMount() {
    this.fetchWeather();
  }

  fetchAsync = async (url) => {
    let response = await fetch(url);
    let data = await response.json();

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    return data;
  }

  fetchWeather = (lat = 25, lon = 25) => {
    try {
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=e7238ba6d604e266124dd596dfdf2645&units=metric&lang=ru&q=Moscow,RU`)
      .then(({list, city}) => {
        const _this = this;
        let item;
        let temperature;
        let weatherCondition;
        const days = [];
        let daysShortName = {};
        for(let i = 0; i < list.length; i++) {
          if (i > 1) {
            item = list[i];
            weatherCondition = item.weather[0].main;
            const date = DateTime.fromMillis(item.dt*1000);
            if(days.length < 6 && !days[date.weekdayShort]) {
              days.push({
                weatherCondition,
                tempMax: item.temp.max.toFixed(1),
                tempMin: item.temp.min.toFixed(1),
                date: date.weekdayShort,
              });
              days[date.weekdayShort] = true;
            }
          }
        };
        this.setState({days});
      })
      .catch(reason => console.log(reason.message))
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/forecast?&appid=e7238ba6d604e266124dd596dfdf2645&units=metric&lang=ru&q=Moscow,RU`)
        .then(({list, city}) => {
          const _this = this;
          let item;
          let temperature;
          let weatherCondition;
          const days = [];
          let daysShortName = {};
          for(let i = 0; i < list.length; i++) {
            if (i < 1) {
              item = list[i];
              temperature = item.main.temp;
              weatherCondition = item.weather[0].main;
              weatherDescription = item.weather[0].description;
              _this.setState({
                temperature: temperature.toFixed(1),
                weatherCondition,
                weatherDescription,
                city,
                isLoading: false
              });
            }
          };
        })
        .catch(reason => console.log(reason.message))
    } catch (e) {
      console.log("error", e)
    }
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
      <Container style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.topRows}>
            <Clock/>
            <CalendarEvents/>
          </View>
          <View>
            {isLoading ?
              (
                <Text>
                  Загружаются данные о погоде
                </Text>
              ) : (
                <Weather
                   weather={weatherCondition}
                   temperature={temperature}
                   description={weatherDescription}
                   days={days}
                   city={city}
                />
            )}
          </View>
        </View>
        <View style={styles.middleRow}>
          {isLoading
              ? (
                <Text>
                  Загружаются данные о погоде
                </Text>
              ) : (
                <Compliments weather={weatherCondition}/>
          )}
        </View>
        <View style={styles.footerRow}>
          <Lenta />
        </View>
      </Container>
    )
  }
}

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  topRow: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRows: {
    justifyContent: 'space-between',
  },
  middleRow: {
    flex: 2,
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
    marginBottom: 10,
  },
});
