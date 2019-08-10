import { connect } from 'react-redux';
import { injectReducer, store} from '../../../store';
import { CalendarEvents } from './CalendarEvents';
import { settings } from './Settings';
import { reducer } from './reducer';

const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

const ConnectedCalendarEvents = (Module) => connect(mapStateToProps, mapDispatchToProps)(Module);

injectReducer(store, {key: 'calendarEvents', reducer});

const CalendarEventsWeb = ConnectedCalendarEvents(CalendarEvents);

export {
  CalendarEventsWeb,
  settings as CalendarEventsSettings
};
