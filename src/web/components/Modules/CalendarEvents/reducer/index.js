import { createReducer } from '../../../../../store/helpers/createReducer';

const initialState = {
  webCalls: [
  ],
  settings: {
    hidePrivate: false,
    hideOngoing: false,
    maximumNumberOfDays: 365,
    sliceMultiDayEvents: true,
    showEnd: false,
    dateFormat: 'MMM Do',
    dateEndFormat: 'HH:mm',
    urgency: 7,
    timeFormat: 'absolute',
  },
  calendarList: [

  ],
  eventList: [
  ]
};

const {reducer, actions} = createReducer(
    initialState,
    {
        setWebcal: (state, payload) => ({
            ...state,
            webCalls: [
              ...state.webCalls,
              payload
            ]
        }),
        setCalendarList: (state, payload) => ({
            ...state,
            calendarList: [
              ...state.calendarList,
              payload
            ]
        }),
        setEventList: (state, payload) => ({
            ...state,
            eventList: [
              ...state.eventList,
              payload
            ]
        }),
    },
    'calendarEvents'
);

export {
    reducer,
    actions,
};
