/**
 * @author Anthony Altieri on 9/6/16.
 */

import React from 'react';
const arrowSrc = require('../../../../img/CourseList/next.svg');

const Course = ({
  code,
  time,
  instructor,
  onArrowClick,
}) => (
  <li className="course">
    <div className="info">
        <h2 className="code">{code}</h2>
        <p className="time">{time}</p>
        <p className="instructor">{instructor}</p>
    </div>
    <div className="navigation">
        <img
          src={arrowSrc}
          onClick={onArrowClick}
          className="arrow"
        />
    </div>
  </li>
);

export default Course;