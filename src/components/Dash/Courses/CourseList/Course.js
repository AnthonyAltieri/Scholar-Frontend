/**
 * @author Anthony Altieri on 9/6/16.
 */

import React from 'react';
const arrowSrc = require('../../../../img/CourseList/next.svg');

const Course = ({
  code,
  title,
  time,
  instructor,
  onEnterClick,
  onJoinClick,
  filter,
  userType
}) => (
  <li className="course">
    <div className="info">
        <h2 className="code">{code}</h2>
      <div className="c">
        <h3 className="title">{title}</h3>
        <p className="time">{time}</p>
        <p className="instructor">{instructor}</p>
      </div>
    </div>
    <div className="navigation">
      {filter === 'active'
        ? (<a
        className="btn"
        onClick={onEnterClick}
        >
        ENTER
        </a>)
        : (userType === 'INSTRUCTOR'
            ? (<a
                className="btn"
                onClick={onJoinClick}
                >
                JOIN
              </a>)
            : null
          )
      }
    </div>
  </li>
);

export default Course;