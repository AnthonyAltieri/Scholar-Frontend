/**
 * @author Anthony Altieri on 9/5/16.
 */

import { combineReducers } from 'redux';
import StudentQuestionList from './StudentQuestionList';
import CourseList from './CourseList';
import User from './User';
import CourseSession from './CourseSession';
import Loading from './Loading';
import Admin from './Admin';
import Overlay from './Overlay';
import {reducer as Toastr} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux';


const Root = combineReducers({
  toastr: Toastr,
  routing: routerReducer,
  Admin,
  User,
  CourseSession,
  Loading,
  Overlay,
  StudentQuestionList,
  CourseList,
});

export default Root;