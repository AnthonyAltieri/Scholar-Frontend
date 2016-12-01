/**
 * @author Anthony Altieri on 10/9/16.
 */

import { combineReducers } from 'redux';
import Reflective from './Reflective';
import Instant from './Instant';

const Assessment = combineReducers({
  Instant,
  Reflective,
});

export default Assessment;
