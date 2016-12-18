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
import Assess from './Assess/Assess';
import AssessmentBank from './AssessmentBank/AssessmentBank';
import Graph  from './Graph/Graph'
import Menu from './Menu';
import Drawer from './Drawer';
import {reducer as Toastr} from 'react-redux-toastr'
import { routerReducer } from 'react-router-redux';


const Root = combineReducers({
  Loading,
  User,
  Course,
  Courses,
  Overlay,
  DashStudent,
  Dash,
  QuestionList,
  StudentQuestionList,
  SignupInstructor,
  Assess,
  AssessmentBank,
  Graph,
  Menu,
  Drawer,
  toastr: Toastr,
  routing: routerReducer,
  Admin,
});

export default Root;
