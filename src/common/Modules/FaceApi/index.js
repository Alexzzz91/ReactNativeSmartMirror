import { Face } from './FaceApi'
import { Settings } from './Settings'
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

const ConnectedFace = (Module) => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, {key: 'face', reducer});

const FaceWeb = ConnectedFace(Face);

export {
  FaceWeb,
  Settings as LentaSettings
};
