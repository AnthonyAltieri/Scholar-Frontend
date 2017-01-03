import Alert from './Alert';

const initialState = {
  Alert: Alert(undefined, {}),
};

const Graph = (state = initialState, action) => {
  switch (action.type) {

    case 'LOG_OUT': {
      return initialState;
    }

    case 'STUDENT_JOINED_COURSESESSION':
    case 'JOIN_COURSE':
    case 'ACTIVATE_COURSE':
    case 'SET_ALERT_THRESHOLD':
    case 'DEFAULT_ALERT_THRESHOLD':
    case 'RECEIVED_ACTIVE_ALERTS':
    case 'UPDATE_ACTIVE_ALERTS_STUDENT' : {
      return {
        ...state,
        Alert: Alert(state.Alert, action),
      }
    }

    default: {
      return state;
    }
  }
};

export default Graph;
