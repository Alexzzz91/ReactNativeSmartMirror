import * as momentEn from 'moment/locale/en-gb';
import * as momentRu from 'moment/locale/ru';
import { moment } from '../common/Moment';
import { DEFAULT_LOCALE, Locales } from '../i18n';

const constants = {
  LOCALE_REPLACE: 'LOCALE_REPLACE',
  FONT_REPLACE: 'FONT_REPLACE',
  FULLSCREEN_MODE_REPLACE: 'FULLSCREEN_MODE_REPLACE',
};

export const initialState = {
  locale: DEFAULT_LOCALE,
  fonts: {
    current: 'AvenirNextCyr',
    list: [
      'AvenirNextCyr',
      'OpenSans_light',
      'Roboto_condensed_light',
    ],
  },
  fullscreenMode: false,
};

export const changeLocale = locale => ({
  type: constants.LOCALE_REPLACE,
  locale,
});

export const changeFont = font => ({
  type: constants.FONT_REPLACE,
  font,
});

export const changeFullscreenMode = () => ({
  type: constants.FULLSCREEN_MODE_REPLACE,
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
    case constants.LOCALE_REPLACE: {
      if (action.locale) {
        updateMomentLocale(action.locale);
      }
      return {
        ...state,
        locale: action.locale,
      };
    }
    case constants.FONT_REPLACE: {
      return {
        ...state,
        fonts: {
          ...state.fonts,
          current: action.font,
        },
      };
    }
    case constants.FULLSCREEN_MODE_REPLACE: {
      return {
        ...state,
        fullscreenMode: !state.fullscreenMode,
      };
    }
    default:
      return state;
  }
}
