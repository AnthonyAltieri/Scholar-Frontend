/**
 * @author Anthony Altieri on 8/26/16.
 */

import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { performTests } from './util';
import Question from '../reducers/Question';

let tests = [];

function testAddQuestion() {
  const stateBefore = {};
  const now = new Date();
  const action = {
    type: 'ADD_QUESTION',
    id: 'testId',
    text: 'test text',
    userId: 'AnthonyAltieri',
    created: now,
  };
  const stateAfter = {
    id: 'testId',
    text: 'test text',
    userId: 'AnthonyAltieri',
    created: now,
    rank: 0,
    votes: [],
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    Question(stateBefore, action)
  ).toEqual(stateAfter);
}
tests.push(testAddQuestion);

function testAddVote() {
  console.log('test ADD_VOTE');
  const stateBefore = {
    id: 'testId',
    text: 'test text',
    userId: 'AnthonyAltieri',
    rank: 0,
    votes: [],
  };
  const now = new Date();
  const action = {
    type: 'ADD_VOTE',
    id: 'testId2',
    voteType: 'UP',
    userId: 'Person',
    created: now,
  };
  const stateAfter = {
    id: 'testId',
    text: 'test text',
    userId: 'AnthonyAltieri',
    rank: 1,
    votes: [{
      id: 'testId2',
      type: 'UP',
      userId: 'Person',
      created: now,
    }],
  }

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    Question(stateBefore, action)
  ).toEqual(stateAfter);
}
tests.push(testAddVote);

function removeVote() {
  console.log('test REMOVE_VOTE');
  const stateBefore = {
    id: 'testId',
    text: 'test text',
    userId: 'AnthonyAltieri',
    rank: 1,
    votes: [{
      id: 'testId2',
      type: 'UP',
      userId: 'Person',
      created: new Date(),
    }],
  };
  const action = {
    type: 'REMOVE_VOTE',
    id: 'testId2',
  };
  const stateAfter = {
    id: 'testId',
    text: 'test text',
    userId: 'AnthonyAltieri',
    rank: 0,
    votes: [],
  }
}
tests.push(removeVote);

export function testQuestion() {
  performTests('Question.js', tests);
}
