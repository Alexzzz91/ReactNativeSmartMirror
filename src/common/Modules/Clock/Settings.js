import React from 'react';
import Dropdown from 'react-dropdown';
import { SettingsComponents, injectComponent } from '../../Settings';

class Settings extends React.PureComponent {
  _onSelect = () => {
    console.log('onChange');
  }

  render () {
    const options = [
      'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    return (
      <Dropdown
        options={options}
        onChange={this._onSelect}
        value={defaultOption}
        placeholder="Формат времени"
      />
    );
  }
};

injectComponent(SettingsComponents, {key: 'clock', component: Settings});

export { Settings };
