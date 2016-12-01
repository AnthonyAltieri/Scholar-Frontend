/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';

const AddCourse = (props) => (
  <div
    {...props}
    className="course add"
  >
    <img
      src={require('../../../../../img/plus.svg')}
      className="icon"
    />
    <p className="text">Add Course</p>
  </div>
);

export default AddCourse;
