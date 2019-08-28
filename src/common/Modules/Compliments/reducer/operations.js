// import * as selectors from './selectors';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const action = (_action) => (_dispatch, _getState) => ({});

export {
  action,
  getRandomInt,
};
