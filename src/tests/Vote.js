/**
 * @author Anthony Altieri on 8/26/16.
 */

import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { performTests } from './util';
import Vote from '../reducers/Vote';

let tests = [];

function testAddVote() {
  console.log('test ADD_VOTE');
  const stateBefore = {};
  const now = new Date();
  const action = {
    type: 'ADD_VOTE',
    voteType: 'UP',
    userId: 'AnthonyAltieri',
    created: now,
  };
  const stateAfter = {
    type: 'UP',
    userId: 'AnthonyAltieri',
    created: now,
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    Vote(stateBefore, action)
  ).toEqual(stateAfter);
}
tests.push(testAddVote);


export function testVote() {
  performTests('Vote.js', tests);
}


export default testVote;
