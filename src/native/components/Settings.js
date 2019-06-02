import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Button } from 'react-native';
import {
  Container, Content, List, ListItem, Body, Left, Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';


import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const GlobalSettings = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

const Settings = () => (
  <Container style={styles.container}>
    <View style={styles.topRow}>
      <Content style={styles.container}>
        <Text>Настройки</Text>
        <Button
          onPress={() => Actions.home()}
          title={'Вернуться'}
        />
      </Content>
    </View>

    <Form type={GlobalSettings} />
    <Form type={User} />
    <Form type={User} />
    <Form type={User} />
    <Form type={User} />
    <Form type={User} />
  </Container>
);

Settings.propTypes = {
};

Settings.defaultProps = {
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
