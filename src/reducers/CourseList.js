/**
 * @author Anthony Altieri on 9/6/16.
 */

import { combineReducers } from 'redux';
import Courses from './Courses';
import VisibleCourseFilter from './VisibleCourseFilter'

const CourseList = combineReducers({
  Courses,
  VisibleCourseFilter,
});

export default CourseList;
