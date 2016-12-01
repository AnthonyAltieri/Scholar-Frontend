/**
 * @author Anthony Altieri on 11/18/16.
 */

import { combineReducers } from 'redux';
import Course from './Course/DashInstructor';
import Home from './Home/DashInstructor';
import Settings from './Settings';

const Instructor = combineReducers({
  Course,
  Home,
  Settings,
});

export default Instructor;
