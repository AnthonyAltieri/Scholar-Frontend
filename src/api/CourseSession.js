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
  CREATE_ATTENDANCE_CODE: PREFIX + '/attendance/create/code',
  CLOSE_ATTENDANCE: PREFIX + '/attendance/end'
};

export async function createAttendanceCode( courseSessionId ) {
  try {
    return await post(
      routes.CREATE_ATTENDANCE_CODE,
      { courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] CourseSession api > createAttendanceCode : ' + e)
  }
}

export async function closeAttendance( courseSessionId ) {
  try {
    return await post(
      routes.CLOSE_ATTENDANCE,
      { courseSessionId }
    );
  } catch (e) {
    console.error('[ERROR] CourseSession api > closeAttendance : ' + e)
  }

}

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
