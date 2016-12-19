import React, { Component } from 'react';
import CourseList from '../Home/CourseList/CourseList';
import * as CourseApi from '../../../../api/Course';
import { getByUser } from '../../../../api/Courses';

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
        <p>Click a Course to recieve grades.</p>
        <CourseList
          noAddCourse
          courses={courses}
          onCourseClick={async (course) => {
          }}
        />
      </div>
    );
  }
}

const stateToProps = (state) => ({
  courses: state.Courses.all,
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
