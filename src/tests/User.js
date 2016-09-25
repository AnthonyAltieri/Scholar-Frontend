/**
 * @author Anthony Altieri on 9/4/16.
 */

import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { performTests } from './util';
import User from '../reducers/User';

let tests = [];
tests.push(testLogIn);
tests.push(testLogOut);

function testLogIn() {
  console.log('test LOG_IN');
  const action = {
    type: 'LOG_IN',
    name: 'Anthony Altieri',
    username: 'AnthonyRAltieri',
    userType: 'STUDENT',
    id: '123',
  };
  const stateAfter = {
    isLoggedIn: true,
    name: 'Anthony Altieri',
    username: 'AnthonyRAltieri',
    type: 'STUDENT',
    id: '123',
  };

  deepFreeze(action);

  expect(
    stateAfter
  ).toEqual(User(undefined, action));
}

function testLogOut() {
  console.log('test LOG_OUT');
  const stateBefore = {
    isLoggedIn: true,
    name: 'Anthony Altieri',
    username: 'AnthonyRAltieri',
    id: '123',
  };
  const action = {
    type: 'LOG_OUT',
  };
  const stateAfter = {
    isLoggedIn: false,
  }

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    stateAfter
  ).toEqual(User(stateBefore, action));
}

export function testUser() {
  performTests('User.js', tests);
}

export default testUser;