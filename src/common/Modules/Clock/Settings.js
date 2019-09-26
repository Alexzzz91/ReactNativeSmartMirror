import React from 'react';
import { connect } from 'react-redux';
import { actions } from './reducer';
import { SelectBox } from '../../Settings/SelectBox';
import { moment } from '../../Moment';

import { SettingsComponents, injectComponent } from '../../Settings';
import { translate } from '../../../i18n';

const Settings = (props) => {
  const {
    locale,
    dateParams,
    timeParams,
    secondsParams,
    setDateParams,
    setTimeParams,
    setSecondsParams,
  } = props;

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
    if (params.value === 'off') {
      return setSecondsParams({ status: false });
    }

    return setDateParams({ format: params.value, ...{ status: true } });
  };

  const setTimeFormats = (params) => {
    if (params.value === 'off') {
      return setSecondsParams({ status: false });
    }

    return setTimeParams({ format: params.value, ...{ status: true } });
  };

  const setSecondsFormats = (params) => {
    if (params.value === 'off') {
      return setSecondsParams({ status: false });
    }

    return setSecondsParams({ format: params.value, ...{ status: true } });
  };

  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3> Время и Дата </h3>
      <SelectBox
        label="Формат даты"
        placeholder="Формат даты"
        options={dateFormats}
        onChange={setDateFormats}
        value={dateFormats.find(f => f.value === dateParams.format || f.value === dateParams.status)}
      />
      <SelectBox
        label="Формат времени"
        placeholder="Формат времени"
        options={timeFormats}
        onChange={setTimeFormats}
        value={timeFormats.find(f => f.value === timeParams.format || f.value === timeParams.status)}
      />
      <SelectBox
        label="Формат секунд"
        placeholder="Формат секунд"
        options={secondsFormats}
        onChange={setSecondsFormats}
        value={secondsFormats.find(f => f.value === secondsParams.format || f.value === secondsParams.status)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.locale,
  dateParams: state.clock.dateParams,
  timeParams: state.clock.timeParams,
  secondsParams: state.clock.secondsParams,
});

const mapDispatchToProps = dispatch => ({
  setDateParams: params => dispatch(actions.setDateParams(params)),
  setTimeParams: params => dispatch(actions.setTimeParams(params)),
  setSecondsParams: params => dispatch(actions.setSecondsParams(params)),
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

injectComponent(SettingsComponents, { key: 'clock', component: ConnectedSettings });

export {
  ConnectedSettings as default,
  ConnectedSettings as Settings,
};


const styles = {
  settingsLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
};
