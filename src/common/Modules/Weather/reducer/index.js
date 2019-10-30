import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  city: null,
  lat: null,
  lon: null,
  appid: 'e7238ba6d604e266124dd596dfdf2645',
  units: 'metric',
  isLoading: false,
  weatherCondition: null,
  temperature: null,
  weatherDescription: null,
  days: [],
  active: true,
};

const { reducer, actions } = createReducer(
  initialState,
  {
    setCoordinates: (state, payload) => ({
      ...state,
      ...payload,
    }),
    setWeatherParams: (state, payload) => ({
      ...state,
      ...payload,
    }),
    toggleActive: state => ({
      ...state,
      active: !state.active,
    }),
  },
  'weather',
);

export {
  reducer,
  actions,
};
