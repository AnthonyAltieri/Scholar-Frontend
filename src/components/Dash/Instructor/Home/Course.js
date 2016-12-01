/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import Colors from '../../../../util/Colors';

const Course = ({
  subject,
  date,
  abbreviation,
  time,
  days,
  onClick,
}) => {
  let imgSrc = null;
  let backgroundColor = '';
  console.log('in Course, subject', subject)
  switch (subject) {
    case 'COMPUTER_SCIENCE': {
      imgSrc = require('../../../../img/CourseIcons/computer.svg');
      backgroundColor = Colors.courseTiles.blue;
      break;
    }
    default: {
      throw new Error(`Invalid course subject: ${subject}`);
    }
  }
if (!date) {
    return (
      <div
        onClick={onClick}
        className="course"
        style={{
        backgroundColor,
      }}
      >
        <img
          className="icon"
          src={imgSrc}
        />
        <p className="abbreviation">{abbreviation}</p>
        <p className="time">{time}</p>
        <p className="days">{days}</p>
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      className="course"
      style={{
        backgroundColor,
      }}
    >
      <img
        className="icon"
        src={imgSrc}
      />
      <p className="abbreviation">{abbreviation}</p>
      <p className="date">{date}</p>
    </div>
  )

};

export default Course;
