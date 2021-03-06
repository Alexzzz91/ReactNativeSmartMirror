import { connect } from 'react-redux';
import { injectReducer, store } from '../../../store';
import { CalendarEvents } from './CalendarEvents';
import { Settings } from './Settings';
import { reducer } from './reducer';

const mapStateToProps = state => ({
  webCalls: state.calendarEvents.webCalls,
  settings: state.calendarEvents.settings,
  locale: state.locale,
});

// const mapDispatchToProps = dispatch => ({});

const ConnectedCalendarEvents = Module => connect(mapStateToProps)(Module);

injectReducer(store, { key: 'calendarEvents', reducer });

const CalendarEventsWeb = ConnectedCalendarEvents(CalendarEvents);

export {
  CalendarEventsWeb,
  Settings as CalendarEventsSettings,
};
