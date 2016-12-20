import { initInstructorAlertGraph, updateInstructorAlertGraph } from '../../util/AlertGraph'

const DEFAULT_THRESHOLD = 30;

const initialState = {
  threshold: DEFAULT_THRESHOLD,
  graph: null,
  activeAlerts: 0,
  attendance: 0
};


const Alert = (state = initialState, action) => {
  switch (action.type) {
    //
    // case 'JOIN_COURSE': {
    //
    // }
    case 'ACTIVATE_COURSE': {
      return {
        ...state,
        graph : initInstructorAlertGraph(DEFAULT_THRESHOLD),
        activeAlerts: 0,
        attendance: 0
      }
    }

    case 'DEACTIVATE_COURSE': {
      console.log("Course Deactivated - In the alert Reducer");
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
        activeAlerts : (action.activeAlerts===0 || !!action.activeAlerts)
          ? action.activeAlerts : state.activeAlerts,
        graph : (!!state.graph) ?
          updateInstructorAlertGraph(
            action.graph,
            (action.activeAlerts===0 || !!action.activeAlerts)
              ? action.activeAlerts : state.activeAlerts,
            (!!action.attendance) ? action.attendance : state.attendance,
            DEFAULT_THRESHOLD
          )
          :
          initInstructorAlertGraph(),
        attendance : (!!action.attendance) ? action.attendance : state.attendance
      }
    }

    case 'UPDATE_ACTIVE_ALERTS_STUDENT': {
      console.log("mark");
    console.log(JSON.stringify(action, null, 2));
      console.log((action.activeAlerts===0 || !!action.activeAlerts)
        ? action.activeAlerts : state.activeAlerts);
      return {
        ...state,
        activeAlerts : (action.activeAlerts===0 || !!action.activeAlerts)
          ? action.activeAlerts : state.activeAlerts,
        attendance : (!!action.attendance) ? action.attendance : state.attendance
      }
    }


    default: {
      return state;
    }
  }
};


export default Alert;
