import * as selectors from './selectors';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const action = (action) => (dispatch, getState) => {

};

export {
    action,
    getRandomInt,
};
