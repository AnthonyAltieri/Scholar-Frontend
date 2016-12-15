import { initInstructorAlertGraph, updateInstructorAlertGraph } from '../../util/AlertGraph'

const DEFAULT_THRESHOLD = 50;

const initialState = {
  threshold: DEFAULT_THRESHOLD,
  graph: null,
  courseId: null,
};

const Alert = (state = initialState, action) => {
  switch (action.type) {

    case 'JOIN_COURSE':
    case 'ACTIVATE_COURSE': {
      return {
        ...state,
        graph : initInstructorAlertGraph(DEFAULT_THRESHOLD)
      }
    }

    // case 'DEACTIVATE_COURSE': {
    //   return initialState;
    // }

    case 'SET_ALERT_THRESHOLD': {
      return {
        ...state,
        threshold: action.threshold,
      }
    }

    case 'DEFAULT_ALERT_THRESHOLD': {
      return {
        ...state,
        threshold: DEFAULT_ALERT_THRESHOLD,
      }
    }

    case 'RECEIVED_ACTIVE_ALERTS': {
      return {
        ...state,
        graph : updateInstructorAlertGraph(action.graph, action.activeAlerts, action.attendance, DEFAULT_THRESHOLD)
      }
    }

    default: {
      return state;
    }
  }
};


export default Alert;
