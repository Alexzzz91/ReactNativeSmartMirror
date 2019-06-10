import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { View, StyleSheet, Button } from 'react-native';
import { Clock } from './Modules/Clock';
import { CalendarEvents } from './Modules/CalendarEvents';
import { Weather } from './Modules/Weather';
import { Compliments } from './Modules/compliments/Compliments';
import { Lenta } from './Modules/Lenta';
import { Constants, Location, Permissions } from 'expo';
import { DateTime } from 'luxon';
import { API_KEY } from './Modules/WeatherAPIKey'

import { Actions } from 'react-native-router-flux';

class About extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    weatherDescription: null,
    updateTime: null,
    days: [],
    city: null,
    error: null
  }

  componentDidMount() {
    this.fetchWeather();
    setInterval(this.fetchWeather, 60000);
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

  fetchWeather = () => {
    const { updateTime } = this.state;
    const now = DateTime.local();

    if (!!updateTime) {
      const diffNow = updateTime.diffNow().toObject();
      if (Math.abs(diffNow.milliseconds) < 900000) {
        return;
      }
    }

    try {
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/forecast/daily?appid=${API_KEY}&units=metric&lang=ru&q=Moscow,RU`)
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
            if(!days[date.weekdayShort]) {
              days.push({
                weatherCondition,
                tempMax: Math.ceil(item.temp.max.toFixed(1)),
                tempMin: Math.ceil(item.temp.min.toFixed(1)),
                date: date.weekdayShort,
              });
              days[date.weekdayShort] = true;
            }
          }
        };
        this.setState({days});
      })
      .catch(reason => console.log(reason.message))
      this.fetchAsync(`https://api.openweathermap.org/data/2.5/forecast?&appid=${API_KEY}&units=metric&lang=ru&q=Moscow,RU`)
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
                temperature: Math.ceil(temperature.toFixed(1)),
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

    this.setState({ updateTime: now });
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
          <View style={styles.settingsButtonView}>
            <Button
              style={styles.settingsButton}
              onPress={() => Actions.settings()}
              title={'Настройки'}
              color="transparent"
            />
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
  settingsButtonView: {
    width: 140,
    height: 20
  },
  settingsButton: {
    opacity: 0.5
  },
});
