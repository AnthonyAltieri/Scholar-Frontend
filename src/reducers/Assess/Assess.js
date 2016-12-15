import Instant from './Instant';
import Reflective from './Reflective';

const initialState = {
  Instant: {},
  Reflective: {},
}

const Assess = (state = initialState, action) => {
  switch (action.type) {
    case 'ASSESS_ACTIVATE_ASSESSMENT': {
      return {
        activeType: action.assessmentType,
        Instant: Instant(state.Instant, action),
        Reflective: Reflective(state.Reflective, action),
      }
    }

    case 'ASSESS_DEACTIVATE_ASSESSMENT': {
      return {
        activeType: null,
        Instant: Instant(state.Instant, action),
        Reflective: Reflective(state.Reflective, action),
      }
    }

    case 'ASSESS_UNSELECT_CORRECT_OPTION':
    case 'ASSESS_CHOOSE_CORRECT_OPTION':
    case 'ASSESS_INSTANT_ADD_OPTION':
    case 'ASSESS_INSTANT_REMOVE_OPTION': {
      return {
        ...state,
        Instant: Instant(state.Instant, action),
      }
    }

    default: {
      return state;
    }
  }
};

export default Assess;
