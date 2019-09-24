
import { connect } from 'react-redux';
import { reducer } from './reducer';
import { Compliments } from './Compliments';
import { Settings } from './Settings';
import { injectReducer, store } from '../../../store';

const mapStateToProps = state => ({
  locale: state.locale,
  compliments: state.compliments.allCompliments,
});

const ConnectedCompliments = Module => connect(mapStateToProps)(Module);

injectReducer(store, { key: 'compliments', reducer });

const ComplimentsWeb = ConnectedCompliments(Compliments);

export {
  ComplimentsWeb,
  Settings as ComplimentsSettings,
};
