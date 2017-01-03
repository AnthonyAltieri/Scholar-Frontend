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

    case 'ENDED_COURSESESSION': {
      return initialState;
    }

    // When course activated reset attendance stats
    case 'ACTIVATE_COURSE': {
      console.log("Fire em up: ACTIVATE COURSE");
      return initialState
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
