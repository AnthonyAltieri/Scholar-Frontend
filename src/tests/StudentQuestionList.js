/**
 * @author Anthony Altieri on 8/26/16.
 */
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { performTests } from './util';
import StudentQuestionList from '../reducers/StudentQuestionList';

let tests = [];

export function testStudentQuestionList() {
  performTests('StudentQuestionList.js', tests);
}
