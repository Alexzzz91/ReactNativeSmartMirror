import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  active: true,
  webCalls: [
    'https://p11-calendars.icloud.com/published/2/MTM2NzAyMjI0ODEzNjcwMqI5jWSNf6penKtjCEx88rFVTg69KSsCtgSKVETp7hBEmb0puBzTnV2NyhpyWCFxMIRN9wOvOEZliDRsVJxpIr8',
    'https://calendar.google.com/calendar/ical/nlj3voogbgmajslig5dd9bppe8%40group.calendar.google.com/public/basic.ics',
    'https://calendar.google.com/calendar/ical/belalex.9132788%40gmail.com/public/basic.ics',
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
  ],
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
  'calendarEvents',
);

export {
  reducer,
  actions,
};
