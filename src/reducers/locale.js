import * as momentEn from 'moment/locale/en-gb';
import * as momentRu from 'moment/locale/ru';
import { moment } from '../common/Moment';
import { DEFAULT_LOCALE, Locales } from '../i18n';

export const initialState = DEFAULT_LOCALE;

export const changeLocale = locale => ({
  type: 'LOCALE_REPLACE',
  locale,
});

const updateMomentLocale = (locale) => {
  switch (locale) {
    case Locales.ru:
      moment.updateLocale('ru', momentRu);
      break;
    case Locales.en:
      moment.updateLocale('en', momentEn);
      break;
    default:
      break;
  }
};


export default function localeReducer(state = initialState, action) {
  switch (action.type) {
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
