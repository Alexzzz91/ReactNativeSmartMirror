import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { DateTime } from 'luxon';

class Lenta extends React.Component {
  changeCompliment = () => {
    alert('меняется новость')
  }

  render() {
    return (
      <Container>
        <View style={styles.base}>
          <TouchableOpacity
            onPress={this.changeCompliment}
          >
            <Text style={styles.themeAndTime}>
              Путешествия, 30 минут назад:
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            Медведь лишил туристку руки
          </Text>
          <Text style={styles.summary}>
            Медведь напал на пытавшуюся его покормить женщину в Амурской области.
            Инцидент произошел туристической базе. Женщина была доставлена в больницу в Благовещенск,
            где врачи ампутировали ей руку в связи с повреждением сосудистого русла.
            Региональное следственное управление СКР проводит проверку.
          </Text>
        </View>
      </Container>
    );
  }
};

export {
  Lenta
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  themeAndTime: {
    fontFamily: "OpenSans_light",
    color: '#666',
    fontWeight: "100",
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
  title: {
    fontFamily: "Roboto_condensed_light",
    color: '#fff',
    fontWeight: "200",
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  summary: {
    fontFamily: "OpenSans_light",
    color: '#aaa',
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
});
