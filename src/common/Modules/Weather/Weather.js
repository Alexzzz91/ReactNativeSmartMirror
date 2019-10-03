import React, { useEffect } from 'react';
import { weatherConditions } from '../../WeatherConditions';

const Weather = (props) => {
  const {
    weather,
    temperature,
    description,
    days,
    city,
    getWeatherdata,
  } = props;

  useEffect(() => getWeatherdata(), []);

  if (!weather) {
    return '';
  }

  return (
    <div>
      <div>
        <div style={{ ...styles.headerContainer }}>
          <i
            style={{ fontSize: 52 }}
            className={`wi ${weatherConditions[weather].webIcon}`}
            color="#fff"
          />
          <span style={{ ...styles.bright }}>
            { temperature }
            ˚
          </span>
        </div>
        <div style={{ ...styles.bodyContainer }}>
          <span style={{ ...styles.title }}>
            {description}
          </span>
        </div>
      </div>
      <div>
        <h2 style={{ ...styles.header }}>
          Прогноз в
          <span style={{ ...styles.headerSpan }}>
            { city }
          </span>
        </h2>
        <div style={{ ...styles.eventRows }}>
          {days.map((day, i) => (
            <div
              key={day.date}
              style={{ ...weatherRowStyles(i + 1) }}
            >
              <div style={{ ...styles.weatherRow }}>
                <span style={{ ...styles.day }}>
                  {day.date}
                </span>
                <i
                  className={`wi ${weatherConditions[day.weatherCondition].webIcon}`}
                  style={{ ...styles.weatherIcon }}
                />
                <span style={{ ...styles.tempMax }}>{day.tempMax}</span>
                <span style={{ ...styles.tempMin }}>{day.tempMin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export {
  Weather as default,
  Weather,
};

const styles = {
  weatherRows: {
    flex: 1,
    margin: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  weatherRow: {
    height: '35px',
    width: '220px',
    margin: '1px',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    margin: 0,
    flex: 1,
    minWidth: '20px',
    padding: 0,
    color: '#fff',
    fontSize: '22px',
    lineHeight: '25px',
  },
  weatherIcon: {
    width: '30px',
    height: '30px',
    fontSize: '30px',
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: '15px',
    marginRight: '15px',
    padding: 0,
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
  },
  tempMax: {
    margin: 0,
    flex: 2,
    padding: 0,
    color: '#FF8E99',
    fontSize: '22px',
    lineHeight: '25px',
    display: 'flex',
    justifyContent: 'center',
  },
  tempMin: {
    margin: 0,
    flex: 2,
    padding: 0,
    color: '#BCDDFF',
    display: 'flex',
    fontSize: '22px',
    lineHeight: '25px',
    justifyContent: 'center',
  },
  header: {
    spanTransform: 'uppercase',
    fontSize: '20px',
    fontFamily: 'Roboto_condensed_light',
    fontWeight: '400',
    borderBottomWidth: '1px',
    borderBottomColor: '#666',
    lineHeight: '25px',
    paddingBottom: '8px',
    marginBottom: '2px',
    marginTop: '2px',
    color: '#999',
  },
  headerSpan: {
    marginLeft: '4px',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bright: {
    fontFamily: 'OpenSans_light',
    color: '#fff',
    fontWeight: '100',
    fontSize: '60px',
    lineHeight: '70px',
    marginTop: '15px',
  },
  brightRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

const weatherRowStyles = number => ({
  opacity: 1 / number,
  margin: 0,
  padding: 0,
});
