/**
 * @author Anthony Altieri on 11/18/16.
 */

import { combineReducers } from 'redux';
import Instructor from './Instructor/Instructor';
import Student from './Student/Student';

const Dash = combineReducers({
  Instructor,
  Student,
});

export default Dash;
