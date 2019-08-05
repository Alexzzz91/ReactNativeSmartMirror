/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from '../reducers';

// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['status'],
};

const createReducer = (asyncReducers) => persistCombineReducers(config, {
  ...reducers,
  ...asyncReducers
});

const middleware = [thunk];

const configureStore = (asyncReducers = {}) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    createReducer(),
    composeEnhancer(applyMiddleware(...middleware)),
  );

  store.asyncReducers = {};

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return { persistor, store };
};

const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers))
};

const { persistor, store } = configureStore();

export {
  persistor,
  store,
  injectReducer
}
