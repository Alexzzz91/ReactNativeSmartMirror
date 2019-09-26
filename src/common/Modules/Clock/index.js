import { connect } from 'react-redux';
import { Clock } from './Clock';
import { Settings } from './Settings';
import { reducer, actions } from './reducer';
import { injectReducer, store } from '../../../store';

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

const ConnectedClock = Module => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, { key: 'clock', reducer });

const ClockWeb = ConnectedClock(Clock);

export {
  ClockWeb,
  Settings as ClockSettings,
};
