import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const DateAndTime = t.struct({
  timeFormat: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

const Calendar = t.struct({
  count: t.String,
  webcalLink: t.String
});

const Weather = t.struct({
  city: t.String,
  dayCount: t.String
});

const Compliment = t.struct({
  compliments: t.String,
});

const News = t.struct({
  compliments: t.String,
});

const Settings = () => (
  <Container style={styles.container}>
    <View style={styles.topView}>
      <Content>
        <Text style={styles.title}>Настройки</Text>
        <Button
          onPress={() => Actions.home()}
          title={'Вернуться'}
        />
      </Content>
    </View>
    <View style={styles.view}>
      <Content style={styles.settingBlock}>
        <Text style={styles.title}>
          Дата и время
        </Text>
        <Form type={DateAndTime} />
      </Content>
      <Content style={styles.settingBlock}>
        <Text style={styles.title}>
          Календарь
        </Text>
        <Form type={Calendar} />
      </Content>
      <Content style={styles.settingBlock}>
        <Text style={styles.title}>
          Погода
        </Text>
        <Form type={Weather} />
      </Content>
      <Content style={styles.settingBlock}>
        <Text style={styles.title}>
          "Комплимент"
        </Text>
        <Form type={Compliment} />
      </Content>
      <Content style={styles.settingBlock}>
        <Text style={styles.title}>
          Новости
        </Text>
        <Form type={News} />
      </Content>
    </View>
  </Container>
);

Settings.propTypes = {
};

Settings.defaultProps = {
};

export default Settings;

const styles = StyleSheet.create({
  title: {
    color: '#000',
    minWidth: '100%',
    fontFamily: "OpenSans_light",
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  view: {
    flex: 4,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  settingBlock: {
    minWidth: 450,
    maxHeight: 300,
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#fafafa',
    backgroundColor: '#fafafa',
  },
  topView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});
