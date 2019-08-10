import { Weather } from './Weather'
import { settings } from './Settings'
import { reducer } from './reducer';
import { connect } from 'react-redux';
import { injectReducer, store} from '../../../store';

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

const ConnectedWeather = (Module) => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, {key: 'weather', reducer});

const WeatherWeb = ConnectedWeather(Weather);

export {
  WeatherWeb,
  settings as WeatherSettings
};
