import React from 'react';
import { SelectBox } from '../../Settings/SelectBox';
import { moment } from '../../Moment';
import { SettingsComponents, injectComponent } from '../../Settings';
import { translate } from '../../../i18n';

const Settings = ({ locale }) => {
  const dateFormats = [
    { value: 'off', label: translate('Off', locale) },
    { value: 'dddd, MMMM Do YYYY', label: moment().format('dddd, MMMM Do YYYY') },
    { value: 'dddd', label: moment().format('dddd') },
    { value: 'MMM Do YY', label: moment().format('MMM Do YY') },
  ];

  const timeFormats = [
    { value: 'off', label: translate('Off', locale) },
    { value: 'h:mm', label: moment().format('h:mm') },
    { value: 'h:mm A', label: moment().format('h:mm A') },
  ];

  const secondsFormats = [
    { value: 'off', label: translate('Off', locale) },
    { value: 'ss', label: '6' },
    { value: 'SS', label: '06' },
  ];

  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3> Время и Дата </h3>
      <SelectBox
        label="Формат даты"
        placeholder="Формат даты"
        options={dateFormats}
      />
      <SelectBox
        label="Формат времени"
        placeholder="Формат времени"
        options={timeFormats}
      />
      <SelectBox
        label="Формат секунд"
        placeholder="Формат секунд"
        options={secondsFormats}
      />
    </div>
  );
};

injectComponent(SettingsComponents, { key: 'clock', component: Settings });

export {
  Settings as default,
  Settings,
};


const styles = {
  settingsLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
};
