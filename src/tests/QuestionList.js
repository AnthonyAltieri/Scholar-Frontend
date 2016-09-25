/**
 * @author Anthony Altieri on 8/26/16.
 */
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { performTests } from './util';
import QuestionList from '../reducers/QuestionList';

let tests = [];
tests.push(testRemoveVote);
tests.push(testAddQuestion);
tests.push(testRemoveQuestion);
tests.push(testAddVote);

function testAddQuestion() {
  console.log('test ADD_QUESTION');
  const stateBefore = [];
  const now = new Date();
  const action = {
    type: 'ADD_QUESTION',
    id: 'testId',
    text: 'test text',
    userId: 'Anthony Altieri',
    created: now,
  };
  const stateAfter = [
    {
      id: 'testId',
      text: 'test text',
      userId: 'Anthony Altieri',
      created: now,
      rank: 0,
      votes: [],
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    QuestionList(stateBefore, action)
  ).toEqual(stateAfter);
}

function testRemoveQuestion() {
  console.log('test REMOVE_QUESTION');
  const stateBefore = [
    {
      id: 'testId',
      text: 'test text',
      userId: 'Anthony Altieri',
      rank: 0,
      votes: [],
    },
  ];
  const action = {
    type: 'REMOVE_QUESTION',
    id: 'testId',
  };
  const stateAfter = [];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    QuestionList(stateBefore, action)
  ).toEqual(stateAfter);
}

function testAddVote() {
  console.log('test ADD_VOTE');
  const now = new Date();
  const stateBefore = [
    {
      id: 'testId',
      text: 'test text',
      userId: 'Anthony Altieri',
      created: now,
      rank: 0,
      votes: [],
    },
  ];
  const action = {
    type: 'ADD_VOTE',
    id: 'testId',
    userId: 'AnthonyAltieri',
    voteType: 'UP',
    created: now,
  };
  const stateAfter = [
    {
      id: 'testId',
      text: 'test text',
      userId: 'Anthony Altieri',
      created: now,
      rank: 1,
      votes: [
        {
          id: 'testId',
          userId: 'AnthonyAltieri',
          type: 'UP',
          created: now,
        },
      ],
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    QuestionList(stateBefore, action)
  ).toEqual(stateAfter);
}

function testRemoveVote() {
  console.log('test REMOVE_VOTE');
  const now = new Date();
  const stateBefore = [
    {
      id: 'testId',
      text: 'test text',
      userId: 'Anthony Altieri',
      created: now,
      rank: 1,
      votes: [
        {
          id: 'testId',
          userId: 'AnthonyAltieri',
          type: 'UP',
          created: now,
        },
      ],
    },
  ];
  const action = {
    type: 'REMOVE_VOTE',
    id: 'testId',
  };
  const stateAfter = [
    {
      id: 'testId',
      text: 'test text',
      userId: 'Anthony Altieri',
      created: now,
      rank: 0,
      votes: [],
    },
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    QuestionList(stateBefore, action)
  ).toEqual(stateAfter);
}

export function testQuestionList() {
  performTests('QuestionList.js', tests);
}
