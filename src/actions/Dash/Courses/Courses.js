/**
 * @author Anthony Altieri on 11/22/16.
 */

export const receivedCourses = (courses) => ({
  type: 'RECEIVED_COURSES',
  courses,
})

export const activateCourse = (courseId, courseSessionId) => ({
  type: 'ACTIVATE_COURSE',
  id: courseId,
  courseSessionId,
});

export const deactivateCourse = (courseId) => ({
  type: 'DEACTIVATE_COURSE',
  id: courseId,
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const addCourse = (course) => ({
  type: 'ADD_COURSE',
  course,
});

