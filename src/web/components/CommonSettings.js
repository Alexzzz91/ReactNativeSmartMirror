import React from 'react';
import { connect } from 'react-redux';
import { SelectBox } from '../../common/Settings/SelectBox';
import { Toggle } from '../../common/Settings/Toggle';
import { changeLocale, changeFont, changeWebcamMode } from '../../reducers/common';
import { Locales, translate } from '../../i18n';
import { SettingsComponents, injectComponent } from '../../common/Settings';

class CommonSettings extends React.PureComponent {
  fontColourStyles = {
    option: (_styles, { data, isDisabled, isSelected }) => ({
      ..._styles,
      fontFamily: data.value,
      background: '#191919',
      color: isSelected ? '#8bf3fd' : 'white',
      padding: 10,

      ':active': {
        Color: !isDisabled && (isSelected ? '#b3b3b3' : '#000'),
      },
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '100%',
      display: 'flex',
      ...(styles && styles.control ? { ...styles.control() } : {}),
    }),
    singleValue: (provided) => {
      const opacity = 1;
      const color = 'white';
      const transition = 'opacity 300ms';

      return {
        ...provided,
        opacity,
        transition,
        color,
        ...(styles && styles.singleValue ? { ...styles.singleValue() } : {}),
      };
    },
  };

  handleOnChangeLocale = (e) => {
    const { setLocale } = this.props;

    setLocale(e.value);
  }

  handleOnChangeFont = (e) => {
    const { setFont } = this.props;

    setFont(e.value);
  }

  handleOnChangeWebcamMode = () => {
    const { toogleWebcamMode } = this.props;
    toogleWebcamMode();
  }

  render() {
    const {
      locale,
      fonts,
      webcamMode,
    } = this.props;

    return (
      <div style={{ ...styles.commonLocales }}>
        <h3>
          { translate('Language', locale) }
        </h3>
        <SelectBox
          label={translate('Language', locale)}
          placeholder={translate('Language', locale)}
          onChange={this.handleOnChangeLocale}
          value={{ value: locale, label: Locales[locale] }}
          options={Object.keys(Locales).map(l => ({ value: l, label: Locales[l] }))}
        />
        <h3>
          { translate('Fonts', locale) }
        </h3>
        <SelectBox
          label={translate('Fonts', locale)}
          placeholder={translate('Fonts', locale)}
          onChange={this.handleOnChangeFont}
          styles={this.fontColourStyles}
          value={{ value: fonts.current, label: fonts.current }}
          options={fonts.list.map(label => ({ value: label, label }))}
        />
        <h3>
          {translate('Use Camera', locale)}
        </h3>
        <Toggle
          label={translate('Active', locale)}
          value={webcamMode}
          onChange={this.handleOnChangeWebcamMode}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.common.locale,
  fonts: state.common.fonts,
  webcamMode: state.common.isWebcamActive,
});

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(changeLocale(locale)),
  setFont: font => dispatch(changeFont(font)),
  toogleWebcamMode: () => dispatch(changeWebcamMode()),
});

const ConnectedCommonSettings = connect(mapStateToProps, mapDispatchToProps)(CommonSettings);

injectComponent(SettingsComponents, { key: 'commonSettings', component: ConnectedCommonSettings });

const styles = {
  commonLocales: {
    width: '100%',
    color: 'white',
    fontSize: '24',
  },
};
