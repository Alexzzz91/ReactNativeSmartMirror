import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../i18n';
import { SettingsComponents, injectComponent } from '../../Settings';
import { Button } from '../../Settings/Button';

const Settings = (props) => {
  const {
    locale,
    profiles,
    isActive,
  } = props;

  const styles = getStyles({ active: isActive });

  return (
    <div style={{ ...styles.settingsFaceApi }}>
      <h3>
        {translate('Persons', locale)}
      </h3>
      {Object.keys(profiles).map((profileKey) => {
        const profile = profiles[profileKey];
        return (
          <div key={profileKey}>
            { profile.name }
          </div>
        );
      })}
      <Button disabled={!isActive}>
        {translate('Add persons', locale)}
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.common.locale,
  isActive: state.common.isWebcamActive,
  profiles: state.face.profiles,
});

const ConnectedSettings = connect(mapStateToProps)(Settings);

injectComponent(SettingsComponents, { key: 'face', component: ConnectedSettings });

export {
  Settings as default,
  Settings,
};

const getStyles = ({ active = true }) => ({
  settingsFaceApi: {
    opacity: active ? 1 : '0.5',
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
});
