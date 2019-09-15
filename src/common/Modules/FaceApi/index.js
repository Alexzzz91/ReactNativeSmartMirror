import { connect } from 'react-redux';
import { Face } from './FaceApi';
import { Settings } from './Settings';
import { reducer } from './reducer';
import { injectReducer, store } from '../../../store';

const mapStateToProps = state => ({
  locale: state.locale,
});

const ConnectedFace = Module => connect(mapStateToProps)(Module);

injectReducer(store, { key: 'face', reducer });

const FaceWeb = ConnectedFace(Face);

export {
  FaceWeb,
  Settings as LentaSettings,
};
