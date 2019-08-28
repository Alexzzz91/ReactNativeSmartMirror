import React from 'react';
import { connect } from 'react-redux';
import { SelectBox } from '../../common/Settings/SelectBox';
import { changeLocale } from '../../reducers/locale';
import { Locales } from '../../i18n';
import { SettingsComponents, injectComponent } from '../../common/Settings';

class LanguageSettings extends React.PureComponent {
  handleOnChange = (e) => {
    const { setLocale } = this.props;

    setLocale(e.value);
  }

  render() {
    const { locale } = this.props;

    console.log('locale', locale);

    return (
      <div style={{ ...styles.settingsLocales }}>
        <h1>Язык интерфейса</h1>
        <SelectBox
          placeholder="язык приложения"
          onChange={this.handleOnChange}
          value={{ value: locale, label: Locales[locale] }}
          options={Object.keys(Locales).map(l => ({ value: l, label: Locales[l] }))}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.locale,
});

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(changeLocale(locale)),
});

const ConnectedLanguageSettings = connect(mapStateToProps, mapDispatchToProps)(LanguageSettings);

injectComponent(SettingsComponents, { key: 'language', component: ConnectedLanguageSettings });

const styles = {
  settingsLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
};
