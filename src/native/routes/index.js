import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import AppConfig from '../../constants/config';

import LocaleContainer from '../../containers/Locale';
import LocaleComponent from '../components/Locale';

import HomeComponent from '../components/Home';
import SettingsComponent from '../components/Settings';

const Index = (
  <Stack hideNavBar>
    <Scene key="home" component={HomeComponent} />
    <Scene key="settings" component={SettingsComponent} />
  </Stack>
);

export default Index;
