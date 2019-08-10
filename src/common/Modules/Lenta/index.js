import { Lenta } from './Lenta'
import { settings } from './Settings'
import { reducer } from './reducer';
import { connect } from 'react-redux';
import { injectReducer, store} from '../../../store';

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

const ConnectedLenta = (Module) => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, {key: 'lenta', reducer});

const LentaWeb = ConnectedLenta(Lenta);

export {
  LentaWeb,
  settings as LentaSettings
};
