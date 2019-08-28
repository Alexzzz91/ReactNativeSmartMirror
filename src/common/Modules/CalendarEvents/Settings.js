import React from 'react';
import { SelectBox } from '../../Settings/SelectBox';
import { SettingsComponents, injectComponent } from '../../Settings';

class Settings extends React.PureComponent {
  render () {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ];

    return (
      <div style={{...styles.settingsLocales}}>
        <h1>Календарь на сегодня</h1>
        <SelectBox
          options={options}
        />
      </div>
    );
  }
};

injectComponent(SettingsComponents, {key: 'calendarEvents', component: Settings});

export { Settings };


const styles = {
  settingsLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
};
