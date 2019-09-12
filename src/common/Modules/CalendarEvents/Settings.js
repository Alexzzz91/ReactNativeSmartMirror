import React from 'react';
import { SelectBox } from '../../Settings/SelectBox';
import { SettingsComponents, injectComponent } from '../../Settings';

const Settings = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];


  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3>Календарь на сегодня</h3>
      <SelectBox
        options={options}
      />
    </div>
  );
};

injectComponent(SettingsComponents, { key: 'calendarEvents', component: Settings });

export {
  Settings as default,
  Settings,
};


const styles = () => ({
  settingsLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
});
