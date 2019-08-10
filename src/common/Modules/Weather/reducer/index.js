import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {

};

const {reducer, actions} = createReducer(
    initialState,
    {

    },
    'weather'
);

export {
    reducer,
    actions,
};
