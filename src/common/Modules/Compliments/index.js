import { Compliments } from './Compliments'
import { settings } from './Settings'
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

const ConnectedCompliments = (Module) => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, {key: 'compliments', reducer});

const ComplimentsWeb = ConnectedCompliments(Compliments);

export {
  ComplimentsWeb,
  settings as ComplimentsSettings
};
