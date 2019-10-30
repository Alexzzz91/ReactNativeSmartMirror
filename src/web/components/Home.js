import React from 'react';
import { connect } from 'react-redux';

import { ClockWeb as Clock } from '../../common/Modules/Clock';
import { CalendarEventsWeb as CalendarEvents } from '../../common/Modules/CalendarEvents';
import { WeatherWeb as Weather } from '../../common/Modules/Weather';
import { ComplimentsWeb as Compliments } from '../../common/Modules/Compliments';
import { LentaWeb as Lenta } from '../../common/Modules/Lenta';
import { FaceWeb as Face } from '../../common/Modules/FaceApi';

import { SettingsButton } from './SettingsButton';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.styles = getStyles({ font: props.fonts.current });
  }

  componentDidUpdate(prevProps) {
    const { fonts } = this.props;

    if (prevProps.fonts.current !== fonts.current) {
      this.styles = getStyles({ font: fonts.current });
    }
  }

  render() {
    const {
      locale,
      isWeatherLoading,
      isWebcamActive,
      isWeatherActive,
      isLentaActive,
      isClockActive,
      isCalendarActive,
    } = this.props;
    const { styles } = this;

    return (
      <div style={{ ...styles.container }}>
        <div style={{ ...styles.topRow }}>
          <div style={{ ...styles.topRows }}>
            {isClockActive && (
              <Clock />
            )}
            {isCalendarActive && (
              <CalendarEvents />)
            }
          </div>
          <SettingsButton locale={locale} />
          { isWeatherActive && (
            <>
              {isWeatherLoading ? (
                <span>
                  Загружаются данные о погоде
                </span>
              ) : (
                <Weather />
              )}
            </>
          )}
        </div>
        <div style={{ ...styles.middleRow }}>
          {isWeatherActive && (
            <>
              {isWeatherLoading
                ? (
                  <span>
                    Загружаются данные о погоде
                  </span>
                ) : (
                  <Compliments />
                )}
            </>
          )}
        </div>
        <div style={{ ...styles.footerRow }}>
          {isLentaActive && <Lenta />}
        </div>
        { isWebcamActive && <Face /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.common.locale,
  fonts: state.common.fonts,
  isWebcamActive: state.common.isWebcamActive,
  isWeatherLoading: state.weather.isLoading,
  isWeatherActive: state.weather.active,
  isLentaActive: state.lenta.active,
  isClockActive: state.clock.active,
  isCalendarActive: state.calendarEvents.active,
});

const ConnectedHome = connect(mapStateToProps)(Home);

export {
  ConnectedHome as default,
  ConnectedHome as Home,
};


const getStyles = options => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    textShadow: '0 0 15px rgba(255,255,255,.5), 0 0 10px rgba(255,255,255,.5)',
    fontFamily: !!options && !!options.font ? options.font : 'AvenirNextCyr',
  },
  topRow: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topRows: {
    display: 'flex',
    flexDirection: 'column',
  },
  middleRow: {
    flex: 2,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  footerRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: '10px',
  },
  settingsButtonView: {
    opacity: 0.3,
    width: '140px',
    height: '20px',
    color: 'white',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '5px',
    padding: '4px 5px',
    border: '1px white solid',
  },
  settingsButton: {
    color: 'white',
    margin: 'auto',
  },
});
