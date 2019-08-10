import { createSelector } from 'reselect';

const calendarEvents = (state) => state.calendarEvents;

const events = (state) => calendarEvents(state).seriesIds;

const calendarEventsSelector = createSelector(
    [events],
    (content) => {
      return [];
    }
);

export {
  events,
  calendarEvents,
  calendarEventsSelector
};
