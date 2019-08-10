import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {setLocale } from '../../reducers/locale';
import { Locales } from '../../i18n';

class Settings extends React.PureComponent {
  render(){
    const { locale, setLocale } = this.props;

    console.log('locale', locale);

    return (
      <div style={{...styles.container}}>
        <div style={{...styles.topRow}}>
          <div style={{...styles.settingsButtonView}}>
            <Link
              style={{...styles.settingsButton}}
              to='/'
            >
            Вернуться обратно
            </Link>
          </div>
        </div>
        <div
          style={{...styles.settingsLocales}}
        >
          {Object.keys(Locales).map((key) => {
            return (
              <div
                style={{...styles.settingsButtonView}}
                key={key}
                selected={key === locale && "selected"}
                onClick={() => setLocale(key)}
              >
                {key}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    locale: state.locale,
  }
};

const mapDispatchToProps = (dispatch) => ({
    setLocale: (locale) => dispatch(setLocale(locale))
});

const ConnectedSettings = connect(mapStateToProps, mapDispatchToProps)(Settings);

export {
  ConnectedSettings as Settings
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#ededed26',
  },
  settingsLocales: {
    color: 'black',
    fontSize: '24',
  },
  settingsButtonView: {
    width: '240px',
    height: '20px',
    textAlign: 'center',
    margin: 'auto',
  },

};
