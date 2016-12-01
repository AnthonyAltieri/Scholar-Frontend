/**
 * @author Anthony Altieri on 11/18/16.
 */

const AddCourse = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TITLE': {
      return {
        ...state,
        title: action.title,
      }
    }

    case 'SET_DAYS': {
      return {
        ...state,
        days: action.days,
      }
    }

    case 'SET_ABBREVIATION': {
      return {
        ...state,
        abbreviation: action.abbreviation,
      }
    }

    case 'SET_TIME_START': {
      return {
        ...state,
        timeStart: action.timeStart,
      }
    }

    case 'SET_TIME_END': {
      return {
        ...state,
        timeEnd: action.timeEnd,
      }
    }

    case 'SET_SUBJECT': {
      return {
        ...state,
        subject: action.subject,
      }
    }

    case 'SET_TERM': {
      return {
        ...state,
        term: action.term,
      }
    }

    case 'SET_DATE_START': {
      return {
        ...state,
        dateStart: action.dateStart,
      }
    }

    case 'SET_DATE_END': {
      return {
        ...state,
        dateEnd: action.dateEnd,
      }
    }

    case 'CLEAR_ADD_COURSE': {
      return {}
    }

    default: {
      return state;
    }
  }
};

export default AddCourse;
