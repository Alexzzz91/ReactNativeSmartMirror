import React from 'react';
import { moment } from '../../../common/Moment';
import { compliments } from '../../baseCompliments';
import { getRandomInt } from './reducer/operations';

const Compliments = () => {
  const
  return (
    <div className={{...styles.formGroup}}>
      <label htmlFor="lastName">Last Name: </label>
      <input type="text" className="form-control" placeholder="Last Name" ref="lastName" />
    </div>
  );
}

export {
  Compliments
};

const styles = {
  formGroup: {

  }
};
