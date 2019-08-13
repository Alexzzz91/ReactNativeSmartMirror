import { DEFAULT_LOCALE, Locales } from '../i18n';
import { moment } from '../common/Moment';
import momentEn from 'moment/locale/en-gb';
import momentRu from 'moment/locale/ru';

export const initialState = DEFAULT_LOCALE;

export const setLocale = (locale) => (dispatch) => {
  dispatch({
    type: 'LOCALE_REPLACE',
    locale
  });
};

export default function localeReducer(state = initialState, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      if (!!action.payload && !!action.payload.locale) {
        updateMomentLocale(action.payload.locale);
      }
      return true;
    case 'LOCALE_REPLACE': {
      if (action.locale) {
        updateMomentLocale(action.locale);
      }
      return action.locale;
    }
    default:
      return state;
  }
}


const updateMomentLocale = (locale) => {
  switch(locale) {
      case Locales.ru:
        moment.updateLocale('ru', momentRu);
      break;
      case Locales.en:
        moment.updateLocale('en', momentEn);
      break;
    }
}
