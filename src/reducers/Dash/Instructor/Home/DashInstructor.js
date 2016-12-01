/**
 * @author Anthony Altieri on 11/18/16.
 */

import { combineReducers } from 'redux';
import AddCourse from './AddCourse';

const DashInstructor = combineReducers({
  AddCourse,
});

export default DashInstructor;
