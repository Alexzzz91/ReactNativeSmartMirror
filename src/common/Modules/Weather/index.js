import { connect } from 'react-redux';
import { Weather } from './Weather';
import { Settings } from './Settings';
import { reducer } from './reducer';
import { operations } from './reducer/operations';
import { injectReducer, store } from '../../../store';

const mapStateToProps = state => ({
  weather: state.weather.weatherCondition,
  temperature: state.weather.temperature,
  description: state.weather.weatherDescription,
  days: state.weather.days,
  city: state.weather.city,
});

const mapDispatchToProps = dispatch => ({
  getWeatherdata: params => dispatch(operations.getWeatherdata(params)),
});

const ConnectedWeather = Module => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, { key: 'weather', reducer });

const WeatherWeb = ConnectedWeather(Weather);

export {
  WeatherWeb,
  Settings as WeatherSettings,
};
