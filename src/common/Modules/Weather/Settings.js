import React from 'react';
import { SelectBox } from '../../Settings/SelectBox';
import { TextArea } from '../../Settings/TextArea';
import { SettingsComponents, injectComponent } from '../../Settings';

const Settings = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3> Погода </h3>
      <TextArea
        value="wed "
      />
      <SelectBox
        options={options}
      />
    </div>
  );
};

injectComponent(SettingsComponents, { key: 'weather', component: Settings });

export {
  Settings as default,
  Settings,
};

const styles = {
  settingsLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
};
