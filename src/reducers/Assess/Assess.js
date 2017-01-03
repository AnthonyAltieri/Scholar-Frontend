import Instant from './Instant';
import Reflective from './Reflective';

const FAKE_ACTION = { type: 'FAKE_ACTION' };

const initialState = {
  Instant: Instant(undefined, FAKE_ACTION),
  Reflective: Reflective(undefined, FAKE_ACTION),
  question: '',
  activeAssessmentId: null,
  mode: 'INSTANT',
};

const Assess = (state = initialState, action) => {
  switch (action.type) {
    case 'ASSESS_ACTIVATE_ASSESSMENT': {
      console.log("ID FOR ACTIVATED ASSESSMENT : " + action.activeAssessmentId);
      return {
        ...state,
        activeType: action.assessmentType,
        Instant: Instant(state.Instant, action),
        Reflective: Reflective(state.Reflective, action),
        activeAssessmentId: action.activeAssessmentId,
      }
    }
   case 'SET_ASSESS_VIEW_MODE': {
     return {
       ...state,
       mode: action.mode,
     }
   }

    case 'ASSESS_DEACTIVATE_ASSESSMENT': {
      return {
        ...state,
        activeType: null,
        question: '',
        Instant: Instant(state.Instant, action),
        Reflective: Reflective(state.Reflective, action),
      }
    }

    case 'ASSESS_INSTANT_ANSWER_RECEIVED':
    case 'ASSESS_UNSELECT_CORRECT_OPTION':
    case 'ASSESS_CHOOSE_CORRECT_OPTION':
    case 'ASSESS_INSTANT_ADD_OPTION':
    case 'ASSESS_INSTANT_REMOVE_OPTION': {
      return {
        ...state,
        Instant: Instant(state.Instant, action),
      }
    }

    case 'REFLECTIVE_STUDENT_SUBMITTED_ANSWER':
    case 'ASSESSMENT_REFLECTIVE_RECEIVED_ANSWERS_WITH_REVIEWS':
    case 'REFLECTIVE_ASSESSMENT_START_REVIEW':
    case 'SUCCESSFULLY_SUBMITTED_REFLECTIVE_ANSWER':
    case 'SUCCESSFULLY_SUBMITTED_REFLECTIVE_REVIEW':
    case 'ASSESSMENT_REFLECTIVE_RECEIVED_ANSWERS_TO_REVIEW':
    case 'REFLECTIVE_ASSESSMENT_ANSWERED':
    case 'REFLECTIVE_ASSESSMENT_REVIEWED': {
      return {
        ...state,
        Reflective: Reflective(state.Reflective, action),
      }
    }

    // For instructors joining a course
    case 'FOUND_ACTIVE_REFLECTIVE_ASSESSMENT':
    case 'FOUND_ACTIVE_INSTANT_ASSESSMENT': {
      return {
        ...state,
        Instant: Instant(state.Instant, action),
        Reflective: Reflective(state.Reflective, action),
        question: action.question,
        activeType: action.assessmentType,
        activeAssessmentId: action.id,
      }
    }

    // For students on socket
    case 'RECEIVED_ACTIVE_ASSESSMENT': {
      return {
        ...state,
        Instant: Instant(state.Instant, action),
        Reflective: Reflective(state.Reflective, action),
        question: action.question,
        activeType: action.assessmentType,
        activeAssessmentId: action.id,
      }
    }

    default: {
      return state;
    }
  }
};

export default Assess;
