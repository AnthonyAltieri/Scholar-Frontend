import Alert from './Alert';

const initialState = {
  Alert: Alert(undefined, {type: 'FAKE_ACTION'}),
};

const Graph = (state = initialState, action) => {
  switch (action.type) {
    case 'JOIN_COURSE':
    case 'ACTIVATE_COURSE':
    case 'SET_ALERT_THRESHOLD':
    case 'DEFAULT_ALERT_THRESHOLD':
    case 'RECEIVED_ACTIVE_ALERTS': {
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
