/**
 * @author Anthony Altieri on 9/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { push } from 'react-router-redux';
import Course from './Course';
import * as CourseActions from '../../../../actions/Course'
import * as api from '../../../../api/Course';


let Courses = ({
  courses,
  filter,
  onEnterClick
}) => {
  return (
    <ul className="courses">
      {courses.length > 0
        ? (courses.map((c) => {
          const timeStart = moment(c.timeStart).format('h:mm a');
          const timeEnd = moment(c.timeEnd).format('h:mm a')
          return (
            <Course
              key={c.id}
              code={c.code}
              title={c.title}
              time={`${timeStart} - ${timeEnd}`}
              instructor={c.instructorName}
              filter={filter}
              onEnterClick={() => {
                onEnterClick(
                  c.id,
                  c.abbreviation,
                  c.title,
                  c.activeCourseSessionId,
                  c.timeStart,
                  c.timeEnd,
                );
              }}
            />
          );
        }))
        : (<div
            className="container-empty"
          >
          <img className="island" src={require('../../../../img/CourseList/island.svg')} />
            <p className="nothing">Nothing Here Yet</p>
          </div>)
      }
    </ul>
  )
};


export default Courses;
