/**
 * @author Anthony Altieri on 8/26/16.
 */

import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { performTests } from './util';
import Votes from '../reducers/votes';

let tests = [];

function testAddVote() {
  console.log('test ADD_VOTE');
  const stateBefore = [];
  const now = new Date();
  const action = {
    type: 'ADD_VOTE',
    voteType: 'UP',
    userId: 'AnthonyAltieri',
    created: now,
  };
  const stateAfter = [
    {
      type: 'UP',
      userId: 'AnthonyAltieri',
      created: now,
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    Votes(stateBefore, action)
  ).toEqual(stateAfter);
}
tests.push(testAddVote);

function testRemoveVote() {
  console.log('test REMOVE_VOTE');

  const stateBefore = [
    {
      userId: 'AnthonyAltieri',
      type: 'UP',
    },
  ];
  const action = {
    type: 'REMOVE_VOTE',
    userId: 'AnthonyAltieri',
  };
  const stateAfter = [];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    Votes(stateBefore, action)
  ).toEqual(stateAfter);
}
tests.push(testRemoveVote);

export function testVotes() {
  performTests('Votes.js', tests);
}
