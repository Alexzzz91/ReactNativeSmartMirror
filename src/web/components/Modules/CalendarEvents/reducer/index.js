import { createReducer } from '../../../../../store/helpers/createReducer';

const initialState = {
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
  }
};

const {reducer, actions} = createReducer(
    initialState,
    {
        test: (state, payload) => ({
            ...state,
            hidePrivate: payload,
        }),
    },
    'calendarEvents'
);

export {
    reducer,
    actions,
};
