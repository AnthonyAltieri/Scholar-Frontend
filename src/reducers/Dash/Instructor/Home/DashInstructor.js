/**
 * @author Anthony Altieri on 11/18/16.
 */

import { combineReducers } from 'redux';
import AddCourse from './AddCourse';
import CourseSection from './CourseSection';

const DashInstructor = combineReducers({
  AddCourse,
  CourseSection,
});

export default DashInstructor;
