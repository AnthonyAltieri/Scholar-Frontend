/**
 * @author Anthony Altieri on 10/1/16.
 */

import { combineReducers } from 'redux';
import Settings from './Settings';
import Assessment from './Assessment/Assessment';
import Ask from './Ask/Ask';
import Mode from './Mode';

const DashInstructor = combineReducers({
  Settings,
  Assessment,
  Ask,
  Mode,
});


export default DashInstructor;
