import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseList from '../Home/CourseList/CourseList';
import * as CourseApi from '../../../../api/Course';
import { getByUser } from '../../../../api/Courses';
import { toastr } from 'react-redux-toastr';

class Grades extends Component {
  async componentWillMount() {
    try {
      const payload = await getByUser(this.props.userId);
      if (!!payload.error) {
        toastr.error('Something went wrong please refresh');
        return;
      }
      this.props.receivedCourses(payload.courses);
    } catch (e) {
    }
  }

  render() {
    const {
      courses
    } = this.props;
    return (
      <div className="home-instructor">
        <div className="c-center">
          <div
            className="card"
            style={{
              width: '98%',
              margin: '12px auto auto auto',
            }}
          >
            <p
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 32,
                fontWeight: 300,
              }}
            >
              Click a Course to recieve grades.
            </p>
            <CourseList
              noAddCourse
              courses={courses}
              onCourseClick={async (course) => {
                try {
                  CourseApi.gradeSummary(course.id, course.title);
                  toastr.success('Grades successfully retrieved');
                } catch (e) {
                  console.error('[ERROR] onCourseClick', e);
                  toastr.error('Something went wrong please try again');
                }
              }}
            />
          </div>

        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  courses: state.Courses.all || [],
  userId: state.User.id,
});
const dispatchToProps = (dispatc) => ({
  receivedCourses: (courses) => {
    dispatch(CourseListActions.receivedCourses(courses));
  },
});

Grades = connect(
  stateToProps,
  dispatchToProps
)(Grades);

export default Grades;
