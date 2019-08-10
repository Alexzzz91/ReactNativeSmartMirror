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
    case 'LOCALE_REPLACE': {
      if (action.locale) {
        switch(action.locale) {
          case Locales.ru:
            moment.updateLocale('ru', momentRu);
          break;
          case Locales.en:
            moment.updateLocale('en', momentEn);
          break;
        }
        return action.locale;
      }
      return initialState;
    }
    default:
      return state;
  }
}
