import React from 'react';
import Dropdown from 'react-dropdown';
import { connect } from 'react-redux';
import { setLocale } from '../../reducers/locale';
import { Locales } from '../../i18n';
import { SettingsComponents, injectComponent } from '../../common/Settings';

class LanguageSettings extends React.PureComponent {
  _onSelect = (e) => {
    console.log('onChange', e);
    this.props.setLocale(e.value);
  }

  render () {
    const { locale } = this.props;

    console.log(121221, Object.keys(Locales).map((k) => ({ value: k, label: Locales[k]})));


    const options = [
      'ru', 'en'
    ]

    return (
      <div style={{...styles.settingsLocales}}>
        <h1>язык</h1>
          <Dropdown
            options={options}
            onChange={this._onSelect}

            placeholder="язык приложения"
          />
        </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
  }
};

const mapDispatchToProps = (dispatch) => ({
    setLocale: (locale) => dispatch(setLocale(locale))
});

const ConnectedLanguageSettings = connect(mapStateToProps, mapDispatchToProps)(LanguageSettings);

injectComponent(SettingsComponents, {key: 'language', component: ConnectedLanguageSettings});

const styles = {
  settingsLocales: {
    color: 'white',
    fontSize: '24',
  },
};
