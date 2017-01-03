/**
 * @author Anthony Altieri on 10/1/16.
 */

import { combineReducers } from 'redux';
import Settings from './Settings';
import Assessment from './Assessment/Assessment';
import Ask from './Ask/Ask';
import Mode from './Mode';
import Main from './Main';

const DashInstructor = combineReducers({
  Settings,
  Assessment,
  Ask,
  Mode,
  Main,
});


export default DashInstructor;
