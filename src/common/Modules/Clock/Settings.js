import React from 'react';
import { SelectBox } from '../../Settings/SelectBox';
import { moment } from '../../Moment';
import { SettingsComponents, injectComponent } from '../../Settings';

class Settings extends React.PureComponent {
  render() {
    const dateFormats = [
      { value: 'dddd, MMMM Do YYYY', label: moment().format('dddd, MMMM Do YYYY') },
      { value: 'dddd', label: moment().format('dddd') },
      { value: 'MMM Do YY', label: moment().format('MMM Do YY') },
    ];

    const timeFormats = [
      { value: 'h:mm', label: moment().format('h:mm') },
      { value: 'h:mm A', label: moment().format('h:mm A') },
    ];

    const secondsFormats = [
      { value: 'ss', label: moment().format('ss') },
      { value: 'SS', label: moment().format('SS') },
    ];

    return (
      <div style={{ ...styles.settingsLocales }}>
        <h1>Время и Дата</h1>
        <SelectBox
          placeholder="Формат даты"
          onChange={this.handleOnChange}
          options={dateFormats}
        />
        <SelectBox
          placeholder="Формат времени"
          onChange={this.handleOnChange}
          options={timeFormats}
        />
        <SelectBox
          placeholder="Формат секунд"
          onChange={this.handleOnChange}
          options={secondsFormats}
        />
      </div>
    );
  }
}

injectComponent(SettingsComponents, { key: 'clock', component: Settings });

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
