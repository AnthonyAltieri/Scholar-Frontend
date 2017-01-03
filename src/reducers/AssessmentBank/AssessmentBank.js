import BankedAssessmentList from './BankedAssessmentList';

const filter = (list, filter) => {
  switch (filter) {
    case 'MOST_RECENT': {
      return list
      .sort((l, r) => r.created.getTime() - l.created.getTime());
    }

    case 'LEAST_RECENT': {
      return list
      .sort((l, r) => l.created.getTime() - r.created.getTime());
    }

    case 'ALL': {
      return list;
    }

    default: {
      throw new Error(`Invalid filter ${filter}`);
    }
  }
}

const hasTag = (bankedAssessment, tag) => {
  if (tag.trim().length === 0) return;
  const regEx = new RegExp(tag);
  return bankedAssessment.tags.filter(t => regEx.test(t))
}

const filterByCourseId = (id, list) => (
  list.filter(i => i.courseId === id)
);

const getValid = (courseId, all) => !!courseId
  ? filterByCourseId(courseId, all)
  : all;

const initialState = {
  courseId: null,
  all: BankedAssessmentList(undefined, {}),
  visible: BankedAssessmentList(undefined, {}),
  bank: BankedAssessmentList(undefined, {}),
  queue: BankedAssessmentList(undefined, {}),
  filter: 'ALL',
  bankTag: '',
  queueTag: '',
};

const AssessmentBank = (state = initialState, action) => {
  switch (action.type) {

    case 'LOG_OUT': {
      return initialState;
    }

    case 'ASSESSMENT_BANK_SET_BANK_TAG': {
      return {
        ...state,
        bankTag: action.bankTag,
      }
    }

    case 'ASSESSMENT_BANK_SET_QUEUE_TAG': {
      return {
        ...state,
        queueTag: action.queueTag,
      }
    }

    case 'ASSESSMENT_BANK_SET_ID': {
      return {
        ...state,
        id: action.id,
      }
    }

    case 'JOIN_COURSE': {
      const courseId = action.id;
      const visible = filterByCourseId(courseId, state.all);
      return {
        ...state,
        visible,
        courseId,
        add: {
          options: [],
          tags: [],
        }
      }
    }

    case 'ASSESSMENT_BANK_MOVE_TO_BANK':
    case 'ASSESSMENT_BANK_MOVE_TO_QUEUE': {
      return {
        ...state,
        all: BankedAssessmentList(state.all, action),
        visible: BankedAssessmentList(state.visible, action),
      }
    }

    case 'ASSESSMENT_BANK_ADD': {
      const all = BankedAssessmentList(
        state.all,
        action
      );
      return {
        ...state,
        all,
        visible: filter(all, state.filter)
      }
    }

    case 'ASSESSMENT_BANK_RETRIEVED': {
      const all = BankedAssessmentList(undefined, action);
      return {
        ...state,
        all,
        visible: getValid(state.courseId, all),
      }

    }

    case 'ASSESSMENT_BANK_FILTER': {
      const valid = getValid(state.courseId, state.all);
      const visible = filter(valid, action.filter);
      return {
        ...state,
        visible,
      }
    }

    case 'ASSESSMENT_BANK_FILTER_BY_TAG': {
      const valid = getValid(state.courseId, state.all);
      const visible = valid.filter(ba => hasTag(ba, action.tag));
      return {
        ...state,
        visible,
      }
    }

    case 'ASSESSMENT_BANK_REMOVE':
    case 'ASSESSMENT_BANK_REMOVE_TAG':
    case 'ASSESSMENT_BANK_ADD_TAG':
    case 'ASSESSMENT_BANK_SAVE_EDIT':
    case 'ASSESSMENT_BANK_ENTER_ADD_TAG_MODE':
    case 'ASSESSMENT_BANK_CANCEL_ADD_TAG_MODE':
    case 'ASSESSMENT_BANK_SHOW_OPTIONS':
    case 'ASSESSMENT_BANK_HIDE_OPTIONS':
    case 'ASSESSMENT_BANK_EDIT_OPTION_MODE':
    case 'ASSESSMENT_BANK_EDIT_OPTION_CLEAR':
    case 'ASSESSMENT_BANK_EDIT_QUESTION_MODE':
    case 'ASSESSMENT_BANK_EDIT_QUESTION_CLEAR':
    case 'ASSESSMENT_BANK_QUESTION_EDITED':
    case 'ASSESSMENT_BANK_OPTION_EDITED':
    case 'ASSESSMENT_BANK_CLEAR_EDITS':
    case 'ASSESSMENT_BANK_ADD_OPTION':
    case 'ASSESSMENT_BANK_REMOVE_OPTION': {
      return {
        ...state,
        all: BankedAssessmentList(state.all, action),
        visible: BankedAssessmentList(state.visible, action),
      }
    }

    case 'SET_OVERLAY_TYPE': {
      return action.overlayType == 'ADD_BANKED_ASSESSMENT'
        ? {
          ...state,
          add: {
            options: [],
            tags: [],
          }
        }
        : state;
    }

    case 'ASSESSMENT_BANK_ADD_ANOTHER_OPTION': {
      return {
        ...state,
        add: {
          ...state.add,
          options: [
            ...state.add.options,
            '',
          ]
        }
      }
    }

    case 'ASSESSMENT_BANK_ADD_REMOVE_OPTION': {
      return {
        ...state,
        add: {
          ...state.add,
          options: [
            ...action.options,
          ]
        }
      }
    }

    case 'ASSESSMENT_BANK_ADD_ANOTHER_TAG': {
      return {
        ...state,
        add: {
          ...state.add,
          tags: [
            ...state.add.tags,
            action.tag,
          ],
        }
      }
    }

    case 'ASSESSMENT_BANK_ADD_REMOVE_TAG': {
      return {
        ...state,
        add: {
          ...state.add,
          tags: [
            ...action.tags,
          ]
        }
      }
    }

    case 'ASSESSMENT_BANK_ADD_CLEAR': {
      return {
        ...state,
        add: null,
      }
    }




    default: {
      return state;
    }

  }
};

export default AssessmentBank;
