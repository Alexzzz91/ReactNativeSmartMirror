import React, { useReducer } from 'react';
import { SelectBox } from '../../Settings/SelectBox';
import { moment } from '../../Moment';
import { reducer, initialState, actions } from './reducer';

import { SettingsComponents, injectComponent } from '../../Settings';
import { translate } from '../../../i18n';


const Settings = ({ locale }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dateFormats = [
    { value: 'off', label: translate('Off', locale) },
    { value: 'dddd, MMMM Do YYYY', label: moment().format('dddd, MMMM Do YYYY') },
    { value: 'dddd', label: moment().format('dddd') },
    { value: 'MMM Do YY', label: moment().format('MMM Do YY') },
  ];

  const timeFormats = [
    { value: 'off', label: translate('Off', locale) },
    { value: 'hh:mm', label: moment().format('hh:mm') },
    { value: 'hh:mm A', label: moment().format('hh:mm A') },
  ];

  const secondsFormats = [
    { value: 'off', label: translate('Off', locale) },
    { value: 'ss', label: '6' },
    { value: 'SS', label: '06' },
  ];

  const setDateFormats = (params) => {
    console.log('params', params);
    console.log('actions.setSecondsParams({ status: false })', actions.setSecondsParams({status: false}));

    if (params.value === 'off') {
      return dispatch(actions.setSecondsParams({ status: false }));
    }

    return dispatch(actions.setDateParams({ format: params.value, ...{ status: true } }));
  };

  const setTimeFormats = (params) => {
    if (params.value === 'off') {
      return dispatch(actions.setSecondsParams({ status: false }));
    }

    return dispatch(actions.setTimeParams({ format: params.value, ...{ status: true } }));
  };

  const setSecondsFormats = (params) => {
    if (params.value === 'off') {
      return dispatch(actions.setSecondsParams({ status: false }));
    }

    return dispatch(actions.setSecondsParams({ format: params.value, ...{ status: true } }));
  };

  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3> Время и Дата </h3>
      <SelectBox
        label="Формат даты"
        placeholder="Формат даты"
        options={dateFormats}
        onChange={setDateFormats}
        value={dateFormats.find(f => f.value === state.dateParams.format || f.value === state.dateParams.status)}
      />
      <SelectBox
        label="Формат времени"
        placeholder="Формат времени"
        options={timeFormats}
        onChange={setTimeFormats}
        value={dateFormats.find(f => f.value === state.timeParams.format || f.value === state.timeParams.status)}
      />
      <SelectBox
        label="Формат секунд"
        placeholder="Формат секунд"
        options={secondsFormats}
        onChange={setSecondsFormats}
        value={dateFormats.find(f => f.value === state.secondsParams.format || f.value === state.secondsParams.status)}
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
