import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  active: true,
};

const { reducer, actions } = createReducer(
  initialState,
  {
    setWebcal: (state, payload) => ({
      ...state,
      webCalls: [
        ...state.webCalls,
        payload,
      ],
    }),
    setCalendarList: (state, payload) => ({
      ...state,
      calendarList: [
        ...state.calendarList,
        payload,
      ],
    }),
    setEventList: (state, payload) => ({
      ...state,
      eventList: [
        ...state.eventList,
        payload,
      ],
    }),
    toggleActive: state => ({
      ...state,
      active: !state.active,
    }),
  },
  'lenta',
);

export {
  reducer,
  actions,
};
