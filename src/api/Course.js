/**
 * @author Anthony Altieri on 9/23/16.
 */

import { post } from './Ajax';

const routes = {
  CREATE: '/api/course/create',
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
    return null;
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
