/**
 * @author Anthony Altieri on 9/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Course from './Course';
import { joinCourse, activateCourse, enterCourse } from '../../../../actions/CourseList';
import * as api from '../../../../api/Courses';

let Courses = ({
  courses,
  userType,
  dispatch,
}) => (
  <ul className="courses">
    {courses.map((c) => {

      return (
        <Course
          key={c.id}
          code={c.code}
          time={c.time}
          instructor={c.instructorName}
          onArrowClick={() => {
            switch (userType) {
              case 'STUDENT': {
                if (!c.isActive) {
                  api.joinCourse(c.id)
                    .then((data) => {
                      const { courseSessionId } = data;
                      dispatch(joinCourse(courseSessionId, c.code));
                    })
                }
                return;
              }

              case 'INSTRUCTOR': {
                if (c.isActive) {
                  dispatch(enterCourse(c.id));
                  return;
                }
                dispatch(activateCourse(c.id));
                return;
              }

              default: {
                throw new Error(`Invalid user type: ${userType}.`);
              }
            }

          }}
        />
      );
    })}
  </ul>
);
Courses = connect()(Courses);

export default Courses;