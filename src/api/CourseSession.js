/**
 * @author Anthony Altieri on 9/8/16.
 */


import { post } from './Ajax';

const routes = {
  CREATE: '/api/courseSession/create',
  END: '/api/courseSession/end',
};

export async function startCourseSession(courseId, instructorId) {
  try {
    return await post(
      routes.CREATE,
      { courseId, instructorId }
    );
  } catch (e) {
    console.error('[ERROR] CourseSession api startCourseSession()', e);
    return null;
  }
}

export async function endCourseSession(courseId, instructorId) {
  try {
    return await post(
      routes.END,
      { courseId, instructorId }
    );
  } catch (e) {
    console.error('[ERROR] CourseSession api endCourseSession()', e);
    return null;
  }
}
