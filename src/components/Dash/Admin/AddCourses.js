/**
 * @author Anthony Altieri on 9/23/16.
 */

import React from 'react';
import { isValidInstructorId } from '../../../api/Admin';
import { createCourse } from '../../../api/Course';
import { toastr } from 'react-redux-toastr';

const clickAddCourse = (instructorId, code, title, time) => {
  isValidInstructorId(instructorId)
    .then(({ result, name }) => {
      if (typeof result === 'undefined') {
        toastr.error('Invalid instructorId, user does not exist');
        return;
      }
      if (!result) {
        toastr.error('User is not of type `INSTRUCTOR`');
        return;
      }
      createCourse(title, code, instructorId, name, time)
        .then((result) => {
          const { id } = result;
          toastr.success('Successfully added course with id', `${id}`)
        })
        .catch((error) => {
          toastr.error('Error adding course', `${error}`);
        })
    })
    .catch((error) => {
      toastr.error('Error checking if instructorId is valid', `${error}`);
    })

};

const AddCourses = ({}) => {
  let instructorId;
  let instructorName;
  let code;
  let title;
  let time;

  return (
    <div className="formcard">
      <form>
        <input
          className="input"
          type="text"
          name="instructorId"
          placeholder="instructorId"
          ref={(n) => { instructorId = n; }}
        />
        <br />
        <input
          className="input"
          type="text"
          name="code"
          placeholder="code"
          ref={(n) => { code = n; }}
        />
        <br />
        <input
          className="input"
          type="text"
          name="title"
          placeholder="title"
          ref={(n) => { title = n; }}
        />
        <br />
        <input
          className="input"
          type="text"
          name="time"
          placeholder="time"
          ref={(n) => { time = n; }}
        />
      </form>
      <a
        className="button background-primary"
        onClick={() => {
          clickAddCourse(instructorId.value, code.value, title.value, time.value);
          intructorId.value = '';
          instructorName.value = '';
          code.value = '';
          title.value = '';
          time.value = '';
        }}
      >
        ADD
      </a>
    </div>
  );
};

export default AddCourses;
