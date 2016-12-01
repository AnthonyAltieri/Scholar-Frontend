/**
 * @author Anthony Altieri on 9/30/16.
 */

const initialState = {
  mode: 'QUESTIONS',
};

const DashStudent = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DASH_MODE': {
      return {
        ...state,
        mode: action.mode,
      }
    }

    case 'ENTER_COURSE': {
      return {
        ...state,
        courseSessionId: action.courseSessionId,
        courseId: action.courseId,
      }
    }

    case 'SHOW_ALERT_OVERLAY': {
      return {
        ...state,
        isAlertOverlayVisible: true,
      }
    }

    case 'HIDE_ALERT_OVERLAY': {
      return {
        ...state,
        isAlertOverlayVisible: false,
      }
    }

    case 'RETRIEVED_QUESTIONS': {
      return {
        ...state,
        questions: action.questions,
      }
    }

    default: {
      return state;
    }
  }
};

export default DashStudent;
