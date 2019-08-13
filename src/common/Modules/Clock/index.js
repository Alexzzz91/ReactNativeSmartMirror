import { Clock } from './Clock'
import { Settings } from './Settings'
import { reducer } from './reducer';
import { connect } from 'react-redux';
import { injectReducer, store} from '../../../store';

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
    dateParams: state.clock.dateParams,
    timeParams: state.clock.timeParams,
    secondsParams: state.clock.secondsParams,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

const ConnectedClock = (Module) => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, {key: 'clock', reducer});

const ClockWeb = ConnectedClock(Clock);

export {
  ClockWeb,
  Settings as ClockSettings
};
