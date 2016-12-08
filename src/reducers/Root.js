/**
 * @author Anthony Altieri on 9/5/16.
 */

import { combineReducers } from 'redux';
import SignupInstructor from './SignupInstructor';
import StudentQuestionList from './StudentQuestionList';
import Courses from './Course/Courses';
import User from './User';
import QuestionList from './Questions/QuestionList';
import Loading from './Loading';
import Admin from './Admin';
import Overlay from './Overlay';
import DashStudent from './DashStudent';
import Dash from './Dash/Dash';
import Course from './Course';
import {reducer as Toastr} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux';


const Root = combineReducers({
  Loading,
  User,
  Course,
  Courses,
  Admin,
  Overlay,
  DashStudent,
  Dash,
  QuestionList,
  StudentQuestionList,
  SignupInstructor,
  toastr: Toastr,
  routing: routerReducer,
});

export default Root;
