import React from 'react';
import { connect } from 'react-redux';
import { actions } from './reducer';
import { translate } from '../../../i18n';
import { Toggle } from '../../Settings/Toggle';
import { SelectBox } from '../../Settings/SelectBox';
import { TextArea } from '../../Settings/TextArea';
import { TextInpit } from '../../Settings/TextInput';
import { SettingsComponents, injectComponent } from '../../Settings';

const Settings = (props) => {
  const {
    locale,
    setWeatherParams,
    weatherActive,
    city,
    appid,
    units,
  } = props;

  const options = [
    { value: 'metric', label: translate('Celsius', locale) },
    { value: 'standard', label: translate('Kelvin', locale) },
    { value: 'imperial', label: translate('Fahrenheit', locale) },
  ];

  const setWeatherUnits = params => setWeatherParams({ units: params.value });

  const setWeatherAppid = params => setWeatherParams({ appid: params.target.value });

  const setWeatherActive = () => setWeatherParams({ active: !weatherActive });

  const setWeatherCity = params => setWeatherParams({ city: params.target.value });

  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3>
        { translate('Weather', locale) }
      </h3>
      <Toggle
        label={translate('Active', locale)}
        value={weatherActive}
        onChange={setWeatherActive}
      />
      <TextInpit
        label={translate('City', locale)}
        value={city}
        onChange={setWeatherCity}
      />
      <TextArea
        label={translate('appid', locale)}
        value={appid}
        onChange={setWeatherAppid}
      />
      <SelectBox
        label={translate('Units format', locale)}
        placeholder={translate('Units format', locale)}
        options={options}
        onChange={setWeatherUnits}
        value={options.find(f => f.value === units)}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.common.locale,
  weatherActive: state.weather.active,
  city: state.weather.city,
  appid: state.weather.appid,
  units: state.weather.units,
});

const mapDispatchToProps = dispatch => ({
  setWeatherParams: params => dispatch(actions.setWeatherParams(params)),
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

injectComponent(SettingsComponents, { key: 'weather', component: ConnectedSettings });

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
