import { connect } from 'react-redux';
import { Weather } from './Weather';
import { Settings } from './Settings';
import { reducer } from './reducer';
import { injectReducer, store } from '../../../store';

const mapStateToProps = state => ({});

const ConnectedWeather = Module => connect(mapStateToProps)(Module);

injectReducer(store, { key: 'weather', reducer });

const WeatherWeb = ConnectedWeather(Weather);

export {
  WeatherWeb,
  Settings as WeatherSettings,
};
