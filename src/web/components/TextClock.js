import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { wordClock, language } from '../worldClock';

class TextClock extends PureComponent {
  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.r = null;
  }

  componentDidMount(){
    const letters = this.r;
    wordClock.init(language['rus'], letters);
  }

  kek() {
    wordClock.switchState();
    //wordClock.init(language['german']);
  }

  render() {
    return (
      <Fragment>
        <div id="clock">
          <span id="e0">●</span>
          <span id="e1">●</span>
          <span id="e2">‌●</span>
          <span id="e3">‌●</span>
          <div id="letters"
               ref={(r) => this.r = r}
          />
        </div>
      </Fragment>
    );
  }
}

export {
  TextClock
};
