import React from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';
import { TextClock } from './TextClock';
import { ModuleClock } from './ModuleClock';
import { ModuleCalendarEvents } from './ModuleCalendarEvents';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showTextTime: false,
    };
  }

  render(){

    const { showTextTime } = this.state;

    const showModuleClock = true;
    const showModuleCalendarEvents = true;

    return (
      <div className="region--global">
        settings-page
      </div>
    );
  };
};

export default Settings;
