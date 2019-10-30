import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  active: true,
  allCompliments: {
    morning: {
      time_start: 6,
      time_stop: 12,
      generic: [
        'Выглядишь как несвежий труп',
        'Смени прическу. Тебе не идет.',
        'Иди работай!',
      ],

      Clear: [
        'Какое замечательное утро!',
      ],
      Clouds: [
        'Опять тучи. Как обычно',
        'Долбанные тучи на небе',
      ],
      Rain: [
        'На улице дождь. Опять.',
      ],
      Thunderstorm: [
        'Гроза, епт! Оо',
      ],
      Snow: [
        'Не выходи из дома, не совершай ошибку!',
      ],
      Fog: [
        'Ты читал \'Туман\' Кинга?',
      ],
    },
    day: {
      time_start: 12,
      time_stop: 18,
      generic: [
        'Что ты дома-то делаешь днем?',
        'Сделай что-нибудь полезное',
        'Дома уберись, что ли',
      ],
      Clear: [
        'Вампирам на улицу не выходить!',
      ],
      Clouds: [
        'Солнца опять не видно за тучами',
        'Тучи опять закрыли все небо',
      ],
      Rain: [
        'Да там ливень! Офигеть!',
        'Мокрый дождя не боится.',
      ],
      Thunderstorm: [
        'Вау, гроза!',
      ],
      Snow: [
        'Снег это фигово. Но зато не дождь. Надо же искать плюсы?',
      ],
      Fog: [
        'Туман? Серьезно? Ебануться!',
      ],
    },
    evening: {
      time_start: 18,
      time_stop: 22,
      generic: [
        'Хватит работать, отдохни!',
      ],
      Clear: [
        'Сфоткай небо, закат наверное шикарный?',
      ],
      Clouds: [
        'Эти тучи даже вечером не уходят',
      ],
      Rain: [
        'Опять льет? Сколько можно?',
      ],
      Thunderstorm: [
        'Гром гремит, земля трясется',
      ],
      Snow: [
        'К счастье, не надо идти в этот снег. Не надо же, да?',
      ],
      Fog: [
        'Режим: Сайлент Хилл - активирован',
      ],
    },
    night: {
      time_start: 22,
      time_stop: 6,
      generic: [
        'Ложись спать, хули тупишь?',
        'Иди спать, тупень',
      ],
      Clear: [
        'Небо чистое, но ночью на это пофиг',
      ],
      Clouds: [
        'Тут тучи даже ночью! Какое счастье, что их не видно',
      ],
      Rain: [
        'Лучше пусть ночью льет, чем днем',
      ],
      Thunderstorm: [
        'Ты боишься молний?',
        'Иди, смотри, там молнии ебашут!',
      ],
      Snow: [
        'Завтра утром будет бело. Фиг проберешься через снег',
      ],
      Fog: [
        'Туман, вау',
      ],
    },
  },
  actualCompliment: [],
  prevCompliment: '',
  compliment: '',
};

const { reducer, actions } = createReducer(
  initialState,
  {
    toggleActive: state => ({
      ...state,
      active: !state.active,
    }),
  },
  'compliments',
);

export {
  reducer,
  actions,
};
