import { injectReducer, store} from '../../../../store';

const initialState = {};

const ACTION_HANDLERS = {
  'test': (state) => ({ ...state, loading: true }),
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}

injectReducer(store, {key: 'compliments', reducer});

const settings = {...initialState};

export { settings };
