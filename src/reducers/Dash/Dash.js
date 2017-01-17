/**
 * @author Anthony Altieri on 11/18/16.
 */

import { combineReducers } from 'redux';
import Instructor from './Instructor/Instructor';
import Student from './Student/Student';
import Account from './Account';

const Dash = combineReducers({
  Instructor,
  Student,
  Account,
});

export default Dash;
