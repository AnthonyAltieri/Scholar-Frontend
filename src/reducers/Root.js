/**
 * @author Anthony Altieri on 9/5/16.
 */

import { combineReducers } from 'redux';
import StudentQuestionList from './StudentQuestionList';
import CourseList from './CourseList';
import User from './User';
import CourseSession from './CourseSession';
import Loading from './Loading';
import {reducer as Toastr} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux';


const Root = combineReducers({
  toastr: Toastr,
  routing: routerReducer,
  User,
  CourseSession,
  Loading,
  StudentQuestionList,
  CourseList,
});

export default Root;