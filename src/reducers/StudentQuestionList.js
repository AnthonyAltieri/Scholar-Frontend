/**
 * @author Anthony Altieri on 8/25/16.
 */

import { combineReducers } from 'redux';
import QuestionList from './Questions/QuestionList';
import VisibleQuestionFilter from './VisibleQuestionFilter';

const StudentQuestionList = combineReducers({
  QuestionList,
  VisibleQuestionFilter
});

export default StudentQuestionList;
