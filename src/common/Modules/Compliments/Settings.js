import React from 'react';
import { connect } from 'react-redux';
import { translate } from '../../../i18n';
import { Toggle } from '../../Settings/Toggle';
import { SettingsComponents, injectComponent } from '../../Settings';
import { actions } from './reducer';

const Settings = (props) => {
  const {
    locale,
    complimentsActive,
    toggleActive,
  } = props;

  const handleToggleActive = () => toggleActive();

  return (
    <div style={{ ...styles.settingsLocales }}>
      <h3>
        { translate('Compliment', locale) }
      </h3>
      <Toggle
        label={translate('Active', locale)}
        value={complimentsActive}
        onChange={handleToggleActive}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.common.locale,
  complimentsActive: state.compliments.active,
});

const mapDispatchToProps = dispatch => ({
  toggleActive: () => dispatch(actions.toggleActive()),
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

injectComponent(SettingsComponents, { key: 'compliments', component: ConnectedSettings });

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
