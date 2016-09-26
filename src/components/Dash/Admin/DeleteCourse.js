/**
 * @author Anthony Altieri on 9/25/16.
 */

import React from 'react';
import { deleteCourse } from '../../../api/Course';
import { toastr } from 'react-redux-toastr';


const DeleteCourse = ({}) => {
  let courseId;

  return (
    <div className="formcard">
      <form>
        <input
          className="input"
          type="text"
          name="courseId"
          placeholder="courseId"
          ref={(n) => { courseId = n; }}
        />
        <br />
      </form>
      <a
        className="button background-primary"
        onClick={() => {
          deleteCourse(courseId.value)
            .then(() => {
              toastr.success('Successfully deleted course');
              courseId.value = '';
            })
            .catch(() => {
              toastr.error('Error deleted course')
            })
        }}
      >
        ADD
      </a>
    </div>
  );
};

export default DeleteCourse;
