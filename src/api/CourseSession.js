/**
 * @author Anthony Altieri on 9/8/16.
 */


import { post } from './Ajax';

const PREFIX = '/api/courseSession'

const routes = {
  CREATE: PREFIX + '/create',
  END: PREFIX + '/end',
  STUDENT_JOIN: PREFIX + '/join/student',
  GET_ACTIVE_ASSESSMENT: PREFIX + '/get/activeAssessment',
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

export async function enterCourseSession(courseId, studentId) {
  try {
    console.log('Enter Course Session for ${courseId} by ' + studentId);
    return await post(
      routes.STUDENT_JOIN,
      { courseId, studentId }
      );
  } catch (e) {
    console.error('[ERROR] CourseSession api > enterCourseSession: ' + e);
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

export async function getActiveAssessment(courseSessionId) {
  try {
    return await post(
      routes.GET_ACTIVE_ASSESSMENT,
      { courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] CourseSession api getActiveAssessment', e);
    return null;
  }
}
