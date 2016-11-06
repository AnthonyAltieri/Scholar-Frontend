/**
 * @author Anthony Altieri on 10/1/16.
 */

import { combineReducers } from 'redux';
import Settings from './Settings';
import Assessment from './Assessment/Assessment';
import Ask from './Ask/Ask';

const DashInstructor = combineReducers({
  Settings,
  Assessment,
  Ask,
});


export default DashInstructor;
