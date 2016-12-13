/**
 * @author Anthony Altieri on 9/23/16.
 */

import { post } from './Ajax';

const routes = {
  CREATE: '/api/course/create',
  ADD_BANKED_ASSESSMENT: '/api/course/add/bankedAssessment',
  GET_BANKED_ASSESSMENTS: '/api/course/get/bankedAssessments',
  ENROLL_STUDENT: '/api/course/enroll/student'
};

/**
 * Create a course
 *
 * @returns { error }
 */
export async function create(
  instructorId,
  instructorName,
  school,
  subject,
  term,
  title,
  abbreviation,
  timeStart,
  timeEnd,
  dateStart,
  dateEnd,
  days,
) {
  try {
    return await post(
      routes.CREATE,
      {
        instructorId,
        instructorName,
        school,
        subject,
        term,
        title,
        abbreviation,
        timeStart,
        timeEnd,
        dateStart,
        dateEnd,
        days,
      }
    );
  } catch (e) {
    return { error: true };
  }
}

export async function getBankedAssessments(courseId) {
  try {
    return post(routes.GET_BANKED_ASSESSMENTS, { courseId });
  } catch (e) {
    console.error('[ERROR] Course Api getBankedAssessments', e);
    return { error: true };
  }
}

export async function addBankedAssessment(courseId, bankedAssessmentId) {
  try {
    return post(
      routes.ADD_BANKED_ASSESSMENT,
      { courseId, bankedAssessmentId }
    );
  } catch (e) {
    console.error('[ERROR] Course Api addBankedAssessment', e);
    return { error: true };
  }
}

export async function enrollStudentInCourse(
  addCode,
  studentId
) {
  try {
    return await post(
      routes.ENROLL_STUDENT,
      {
        addCode,
        studentId
      }
    );
  } catch (e) {
    return null;
  }
}
