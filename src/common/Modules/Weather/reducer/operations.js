// import * as selectors from './selectors';
import { moment } from '../../../Moment';
import { actions } from '.';

const operations = {
  serialize: (obj) => {
    const str = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const p in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(p)) {
        str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
      }
    }
    return str.join('&');
  },
  getWeatherdata: () => async (dispatch, getState) => {
    const state = getState();
    const { weather, common } = state;
    const {
      city,
      appid,
      lat,
      lon,
    } = weather;

    const { locale } = common;

    let queryParams = {
      appid,
      lang: locale,
      units: 'metric',
    };

    if ((!city && !lat && !lon) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(actions.setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }));
        return dispatch(operations.getWeatherdata());
      });
    } else if (city) {
      queryParams = {
        ...queryParams,
        q: city,
      };
    } else if (lat && lon) {
      queryParams = {
        ...queryParams,
        lat,
        lon,
      };
    }
    if (!queryParams.q && (!queryParams.lat && !queryParams.lon)) {
      return;
    }

    const query = operations.serialize(queryParams);
    try {
      let days = [];
      let temperature;
      let weatherCondition;
      let weatherDescription;
      let isLoading = true;
      const resp1 = fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}`);
      const resp2 = fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`);
      Promise.all([resp1, resp2])
        .then((resps) => {
          Promise.all([resps[0].json(), resps[1].json()])
            .then((objects) => {
              const { list, city: weatherCity } = objects[0];
              let item;
              for (let i = 0; i < list.length; i += 1) {
                item = list[i];
                weatherCondition = item.weather[0].main;
                const dateTime = moment(item.dt_txt);
                const day = dateTime.format('ddd');
                if (!days[day]) {
                  days.push({
                    weatherCondition,
                    tempMax: Math.ceil(item.main.temp_max.toFixed(1)),
                    tempMin: Math.ceil(item.main.temp_min.toFixed(1)),
                    date: day,
                  });
                  days[day] = true;
                }
              }
              days = days.filter(d => typeof d === 'object');
              const weathedData = objects[1];
              temperature = weathedData.main.temp;
              weatherCondition = weathedData.weather[0].main;
              weatherDescription = weathedData.weather[0].description;
              isLoading = false;
              dispatch(actions.setWeatherParams({
                days, temperature, weatherCondition, weatherDescription, city: weatherCity.name, isLoading,
              }));
            });
        })
        .catch(reason => console.log(reason.message));
    } catch (e) {
      console.log('error', e);
    }
  },
};

export {
  operations as default,
  operations,
};
