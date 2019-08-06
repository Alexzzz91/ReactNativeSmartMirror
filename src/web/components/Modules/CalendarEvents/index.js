import { connect } from 'react-redux';
import { injectReducer, store} from '../../../../store';
import { CalendarEvents } from './CalendarEvents';
import { settings } from './Settings';
import { reducer } from './reducer';

const mapStateToProps = (state) => {
  console.log('state', state);
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  console.log('dispatch', dispatch);
  return {

  };
}

const ConnectedCalendarEvents = connect(mapStateToProps, mapDispatchToProps)(CalendarEvents);

injectReducer(store, {key: 'calendarEvents', reducer});

export {
  ConnectedCalendarEvents as CalendarEvents,
  settings as CalendarEventsSettings
};
