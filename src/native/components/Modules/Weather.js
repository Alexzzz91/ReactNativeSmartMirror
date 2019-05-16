import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Button } from 'react-native';
import { weatherConditions } from './WeatherConditions'

class Weather extends React.Component {
  render() {
    const {
      weather,
      temperature,
      description,
      days,
      city,
    } = this.props;

    return (
      <Container>
        <View>
          <View style={styles.headerContainer}>
            <MaterialCommunityIcons
              size={72}
              name={weatherConditions[weather].icon}
              color={'#fff'}
            />
            <Text style={styles.bright}>{temperature}˚</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{description}</Text>
            {/*<Text style={styles.subtitle}>
             {weatherConditions[weather].subtitle}
            </Text>*/}
          </View>
        </View>
        <View>
          <H2 style={styles.header}>Прогноз в {city.name}, {city.country}</H2>
          <View style={styles.eventRows}>
            {days.map((day, i) =>
              <View
                key={day.date}
                style={weatherRowStyles(i)}
              >
                <View style={styles.weatherRow}>
                  <Text style={styles.day}>{day.date}</Text>
                  <MaterialCommunityIcons
                    size={25}
                    name={weatherConditions[day.weatherCondition].icon}
                    style={styles.weatherIcon}
                  />
                  <Text style={styles.tempMax}>{day.tempMax}</Text>
                  <Text style={styles.tempMin}>{day.tempMin}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Container>
    );
  }
};

export {
  Weather
};

const styles = StyleSheet.create({
  weatherRows: {
    flex: 1,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  weatherRow: {
    height: 35,
    width: 220,
    margin: 1,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    margin: 0,
    flex: 1,
    minWidth: 20,
    padding: 0,
    color: '#fff',
    fontSize: 22,
    lineHeight: 25,
  },
  weatherIcon: {
    width: 30,
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
    padding: 0,
    color: '#fff',
    justifyContent: 'center',
  },
  tempMax: {
    margin: 0,
    flex: 2,
    padding: 0,
    color: '#FF8E99',
    fontSize: 22,
    lineHeight: 25,
  },
  tempMin: {
    margin: 0,
    flex: 2,
    padding: 0,
    color: '#BCDDFF',
    fontSize: 22,
    lineHeight: 25,
  },
  header: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: "Roboto_condensed_light",
    fontWeight: '400',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    lineHeight: 25,
    paddingBottom: 8,
    marginBottom: 2,
    marginTop: 2,
    color: '#999',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bright: {
    fontFamily: "OpenSans_light",
    color: '#fff',
    fontWeight: "100",
    fontSize: 60,
    lineHeight: 70,
    marginTop: 15,
  },
  brightRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

const weatherRowStyles = (number) => StyleSheet.create({
  opacity: 1 / number,
  margin: 0,
  padding: 0,
});
