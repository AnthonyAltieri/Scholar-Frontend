/**
 * @author Anthony Altieri on 9/6/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Course from './Course';
import * as CourseActions from '../../../../actions/Course'
import * as api from '../../../../api/Course';


let Courses = ({
  courses,
  userType,
  filter,
  joinCourse,
  navigate,
}) => {
  return (
    <ul className="courses">
      {courses.length > 0
        ? (courses.map((c) => {
        return (
          <Course
            key={c.id}
            code={c.code}
            title={c.title}
            time={c.time}
            instructor={c.instructorName}
            userType={userType}
            filter={filter}
            onEnterClick={() => {
              api.enterCourse(c.id)
                .then((data) => {
                  const { courseSessionId } = data;
                  // TODO: action
                })
            }}
            onJoinClick={() => {
              joinCourse(c.id, c.code, c.title);
              navigate('/dash/instructor/')
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

const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
  joinCourse: (id, code, title) => {
    dispatch(CourseActions.joinCourse(id, code, title))
  },
  navigate: (url) => {
    dispatch(push(url));
  }
});

Courses = connect(
  stateToProps,
  dispatchToProps,
)(Courses);

export default Courses;