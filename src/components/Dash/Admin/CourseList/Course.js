/**
 * @author Anthony Altieri on 9/25/16.
 */

import React from 'react';

const Course = ({
  id,
  instructorId,
  instructorName,
  code,
  title,
}) => {
  return (
    <li>
      <div className="r">
        <p className="label">id:</p>
        <h3>{id}</h3>
      </div>
      <div className="r">
        <p className="label">instructor name:</p>
        <h3>{instructorName}</h3>
      </div>
      <div className="r">
        <p className="label">instructor id:</p>
        <h3>{instructorId}</h3>
      </div>
      <div className="r">
        <p className="label">title</p>
        <h3>{title}</h3>
      </div>
      <div className="r">
        <p className="label">code:</p>
        <p>{code}</p>
      </div>
    </li>
  );
};

export default Course;
