/**
 * @author Anthony Altieri on 9/25/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllCourses } from '../../../api/Courses';
import * as AdminActions from '../../../actions/Admin'
import Course from './CourseList/Course';

class GetCourses extends Component{
  componentDidMount() {
    fetchAllCourses()
      .then((courses) => {
        this.props.receivedCourses(courses)
      })
  }

  render() {
    const { courses } = this.props;
    console.log('courses', courses);
    return (
      <div className="formcard">
        <ul className="list">
          {courses.map(c => (
            <Course
              id={c.id}
              instructorName={c.instructorName}
              instructorId={c.instructorId}
              title={c.title}
              code={c.code}
              key={c.id}
            />
          ))}
        </ul>
      </div>
    );
  }
};
GetCourses = connect(
  (state) => ({
    courses: state.Admin.courses,
  }),
  (dispatch) => ({
    receivedCourses: (courses) => {
      dispatch(AdminActions.receivedCourses(courses));
    }
  })
)(GetCourses);

export default GetCourses;

