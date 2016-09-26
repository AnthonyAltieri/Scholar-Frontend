/**
 * @author Anthony Altieri on 9/25/16.
 */

import React from 'react';
import { addUser } from '../../../api/User';
import { toastr } from 'react-redux-toastr';

const getChoice = (isStudent, isInstructor, isAdmin) => {
  if (isStudent) {
    return 'STUDENT';
  }
  if (isInstructor) {
    return 'INSTRUCTOR';
  }
  if (isAdmin) {
    return 'ADMIN';
  }
  throw new Error ('Invalid can\'t have no selection');
};

const AddUser = () => {
  let isStudent;
  let isInstructor;
  let isAdmin;
  let username;
  let password;
  let firstname;
  let lastname;

  return (
    <div className="formcard">
      <form>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="username/email"
          ref={(n) => { username = n }}
        />
        <input
          className="input"
          type="text"
          name="firstname"
          placeholder="firstname"
          ref={(n) => { firstname = n }}
        />
        <input
          className="input"
          type="text"
          name="lastname"
          placeholder="lastname"
          ref={(n) => { lastname = n }}
        />
        <input
          className="input"
          type="text"
          name="password"
          placeholder="password"
          ref={(n) => { password = n }}
        />
        <div className="r">
          <h3>type:</h3>
          <input
            className="radio"
            type="radio"
            name="type"
            value="STUDENT"
            ref={(n) => {
              isStudent = n;
              if (!isStudent) return;
              isStudent.checked = true;
            }}
          />
          <p>STUDENT</p>
          <input
            className="radio"
            type="radio"
            name="type"
            value="INSTRUCTOR"
            ref={(n) => { isInstructor = n }}
          />
          <p>INSTRUCTOR</p>
          <input
            className="radio"
            type="radio"
            name="type"
            value="ADMIN"
            ref={(n) => { isAdmin = n }}
          />
          <p>ADMIN</p>
          <br />
        </div>
      </form>
      <a
        className="button background-primary"
        onClick={() => {
          if (!username.value) {
            toastr.error('username not defined');
            return;
          }
          if (!password.value) {
            toastr.error('password not defined');
            return;
          }
          if (!firstname.value) {
            toastr.error('firstname not defined');
            return;
          }
          if (!lastname.value) {
            toastr.error('lastname not defined');
            return;
          }
          const type = getChoice(isStudent, isInstructor, isAdmin);
          addUser(username.value, password.value, firstname.value, lastname.value, type)
            .then((user) => {
              toastr.success('Successfully created user');
              firstname.value = '';
              lastname.value = '';
              username.value = '';
              password.value = '';
            })
            .catch((error) => {
              toastr.error('Failed adding user', error);
            })
        }}
      >
        ADD
      </a>
    </div>
  );
};

export default AddUser;