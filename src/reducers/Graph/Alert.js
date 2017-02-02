import { initInstructorAlertGraph, updateInstructorAlertGraph } from '../../util/AlertGraph'

const DEFAULT_THRESHOLD = 10;

const initialState = {
  threshold: DEFAULT_THRESHOLD,
  graph: null,
  activeAlerts: 0,
  numberInCourseSession: 0,
  tickNumber: 0
};


const Alert = (state = initialState, action) => {
  switch (action.type) {

    case 'LOG_OUT': {
      return initialState;
    }

    case 'JOIN_COURSE':
    case 'STUDENT_JOINED_COURSESESSION': {
      return {
        ...state,
        numberInCourseSession: action.numberInCourseSession,
      }
    }

    case 'ACTIVATE_COURSE': {
      return {
        ...state,
        graph : initInstructorAlertGraph(DEFAULT_THRESHOLD),
        activeAlerts: 0,
        numberInCourseSession: 0,
        tickNumber: 0
      }
    }

    case 'DEACTIVATE_COURSE': {
      return {
        ...state,
        graph : initInstructorAlertGraph(DEFAULT_THRESHOLD),
        activeAlerts: 0
      }
    }

    case 'SET_ALERT_THRESHOLD': {
      return {
        ...state,
        threshold: action.threshold,
      }
    }

    case 'DEFAULT_ALERT_THRESHOLD': {
      return {
        ...state,
        threshold: DEFAULT_THRESHOLD,
      }
    }

    case 'RECEIVED_ACTIVE_ALERTS': {
      return {
        ...state,
        tickNumber: state.tickNumber + 1,
        activeAlerts : (action.activeAlerts === 0 || !!action.activeAlerts)
          ? action.activeAlerts : state.activeAlerts,
        graph : (!!state.graph)
          ? updateInstructorAlertGraph(
            action.graph,
            (action.activeAlerts === 0 || !!action.activeAlerts)
              ? action.activeAlerts : state.activeAlerts,
            state.numberInCourseSession,
            DEFAULT_THRESHOLD
          )
          : initInstructorAlertGraph(),
        numberInCourseSession : (!!action.numberInCourseSession) ? action.numberInCourseSession : state.numberInCourseSession
      }
    }

    case 'UPDATE_ACTIVE_ALERTS_STUDENT': {
      return {
        ...state,
        activeAlerts : (action.activeAlerts===0 || !!action.activeAlerts)
          ? action.activeAlerts : state.activeAlerts
      }
    }


    default: {
      return state;
    }
  }
};


export default Alert;
