/**
 * Created by bharatbatra on 12/19/16.
 */

const initialState = {
  code: null,
  numberAttendees: 0,
  numberInCourseSession: 0,
};

const Attendance = (state = initialState, action) => {
  switch (action.type) {

    case 'ATTENDANCE_CLEAR':
    case 'ENDED_COURSESESSION': {
      return initialState;
    }


    // When course activated reset attendance stats
    case 'ACTIVATE_COURSE': {
      return initialState
    }

    case 'SET_ATTENDANCE': {
      return {
        ...state,
        numberAttendees: action.numberAttendees,
        numberInCourseSession: action.numberInCourseSession,
      }
    }

    case 'ATTENDANCE_CODE_ACTIVATED' : {
      return {
        ...state,
        code : action.code
      }
    }

    case 'ATTENDANCE_CODE_DEACTIVATED' : {
      return {
        ...state,
        code: null
      }
    }

    case 'STUDENT_JOINED_ATTENDANCE' : {
      return {
        ...state,
        numberAttendees: action.attendance
      }
    }

    case 'STUDENT_JOINED_COURSESESSION': {
      return {
        ...state,
        numberInCourseSession: action.numberInCourseSession,
      }
    }

    default : {
      return state;
    }
  }
};

export default Attendance;
