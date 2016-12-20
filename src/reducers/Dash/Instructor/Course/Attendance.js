/**
 * Created by bharatbatra on 12/19/16.
 */

const initialState = {
  code: null,
  numberAttendees: 0,
}

const Attendance = (state = initialState, action) => {
  console.log("Attendance Reducer Hit");
  console.log(action.type);
  console.log(JSON.stringify(state, null, 2));
  switch (action.type) {

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

    default : {
      return state;
    }
  }
};

export default Attendance;