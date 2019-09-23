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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_DATE_CONFIG':
      return {
        ...state,
        dateParams: [
          ...state.dateParams,
          action.payload,
        ],
      };
    case 'CHANGE_TIME_CONFIG':
      return {
        ...state,
        timeParams: [
          ...state.timeParams,
          action.payload,
        ],
      };
    case 'CHANGE_SECONDS_CONFIG':
      console.log('action', action);
      return {
        ...state,
        secondsParams: [
          ...state.secondsParams,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

const actions = {
  setDateParams: payload => ({
    type: 'CHANGE_DATE_CONFIG',
    payload,
  }),
  setTimeParams: payload => ({
    type: 'CHANGE_TIME_CONFIG',
    payload,
  }),
  setSecondsParams: payload => ({
    type: 'CHANGE_SECONDS_CONFIG',
    payload,
  }),
};

export {
  reducer,
  actions,
  initialState,
};
