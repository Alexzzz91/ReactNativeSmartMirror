import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  dateParams: {
    status: true,
    format: 'dddd, MMMM Do YYYY',
  },
  timeParams: {
    status: true,
    format: 'hh:mm',
  },
  secondsParams: {
    status: true,
    format: 'ss',
  },
};

const {reducer, actions} = createReducer(
    initialState,
    {
        setDateParams: (state, payload) => ({
            ...state,
            dateParams: [
              ...state.dateParams,
              payload
            ]
        }),
        setTimeParams: (state, payload) => ({
            ...state,
            timeParams: [
              ...state.timeParams,
              payload
            ]
        }),
        setSecondsParams: (state, payload) => ({
            ...state,
            secondsParams: [
              ...state.secondsParams,
              payload
            ]
        }),
    },
    'clock'
);

export {
    reducer,
    actions,
};
