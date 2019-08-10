import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  complimentVariants: [],
  prevCompliment: '',
  compliment: '',
};

const {reducer, actions} = createReducer(
    initialState,
    {

    },
    'compliments'
);

export {
    reducer,
    actions,
};
