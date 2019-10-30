import React from 'react';
import { connect } from 'react-redux';
import { actions } from './reducer';
import { SelectBox } from '../../Settings/SelectBox';
import { moment } from '../../Moment';
import { Toggle } from '../../Settings/Toggle';
import { SettingsComponents, injectComponent } from '../../Settings';
import { translate } from '../../../i18n';

const Settings = (props) => {
  const {
    locale,
    dateParams,
    timeParams,
    clockActive,
    toggleActive,
    secondsParams,
    setDateParams,
    setTimeParams,
    setSecondsParams,
  } = props;

  const dateFormats = [
    { value: false, label: translate('Off', locale) },
    { value: 'dddd, MMMM Do YYYY', label: moment().format('dddd, MMMM Do YYYY') },
    { value: 'dddd', label: moment().format('dddd') },
    { value: 'MMM Do YY', label: moment().format('MMM Do YY') },
  ];

  const timeFormats = [
    { value: false, label: translate('Off', locale) },
    { value: 'hh:mm', label: moment().format('hh:mm') },
    { value: 'hh:mm A', label: moment().format('hh:mm A') },
  ];

  const secondsFormats = [
    { value: false, label: translate('Off', locale) },
    { value: 'ss', label: '6' },
  ];

  const setDateFormats = (params) => {
    let payload = { format: params.value, ...{ status: true } };

    if (!params.value) {
      payload = { status: false };
    }

    return setDateParams(payload);
  };

  const setTimeFormats = (params) => {
    let payload = { format: params.value, ...{ status: true } };

    if (!params.value) {
      payload = { status: false };
    }

    return setTimeParams(payload);
  };

  const setSecondsFormats = (params) => {
    let payload = { format: params.value, ...{ status: true } };

    if (!params.value) {
      payload = { status: false };
    }

    return setSecondsParams(payload);
  };

  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3>
        {translate('Date and time', locale)}
      </h3>
      <Toggle
        label={translate('Active', locale)}
        value={clockActive}
        onChange={toggleActive}
      />
      <SelectBox
        label={translate('Date format', locale)}
        placeholder={translate('Date format', locale)}
        options={dateFormats}
        onChange={setDateFormats}
        value={dateFormats.find(f => f.value === dateParams.status || f.value === dateParams.format)}
      />
      <SelectBox
        label={translate('Time format', locale)}
        placeholder={translate('Time format', locale)}
        options={timeFormats}
        onChange={setTimeFormats}
        value={timeFormats.find(f => f.value === timeParams.status || f.value === timeParams.format)}
      />
      <SelectBox
        label={translate('Seconds format', locale)}
        placeholder={translate('Seconds format', locale)}
        options={secondsFormats}
        onChange={setSecondsFormats}
        value={secondsFormats.find(f => f.value === secondsParams.status || f.value === secondsParams.format)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.common.locale,
  clockActive: state.clock.active,
  dateParams: state.clock.dateParams,
  timeParams: state.clock.timeParams,
  secondsParams: state.clock.secondsParams,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: () => dispatch(actions.toggleActive()),
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
