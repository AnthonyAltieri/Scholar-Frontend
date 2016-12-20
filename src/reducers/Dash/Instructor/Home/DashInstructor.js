/**
 * @author Anthony Altieri on 11/18/16.
 */

import { combineReducers } from 'redux';
import AddCourse from './AddCourse';
import Courses from './Courses';

const DashInstructor = combineReducers({
  AddCourse,
  Courses,
});

export default DashInstructor;
