import { connect } from 'react-redux';
import { Clock } from './Clock';
import { Settings } from './Settings';
import { reducer } from './reducer';
import { injectReducer, store } from '../../../store';

const mapStateToProps = state => ({
  locale: state.locale,
  dateParams: state.clock.dateParams,
  timeParams: state.clock.timeParams,
  secondsParams: state.clock.secondsParams,
});

const ConnectedClock = Module => connect(mapStateToProps)(Module);

injectReducer(store, { key: 'clock', reducer });

const ClockWeb = ConnectedClock(Clock);

export {
  ClockWeb,
  Settings as ClockSettings,
};
