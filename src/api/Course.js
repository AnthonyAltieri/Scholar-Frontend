/**
 * @author Anthony Altieri on 9/23/16.
 */

import { post } from './Ajax';

const routes = {
  CREATE: '/api/course/create',
  ADD_BANKED_ASSESSMENT: '/api/course/add/bankedAssessment',
  GET_BANKED_ASSESSMENTS: '/api/course/get/bankedAssessments',
  ENROLL_STUDENT: '/api/course/enroll/student',
  GRADE_SUMMARY: '/api/course/grade/summary',
  GET_ADD_CODES: '/api/course/get/addCodes',
  GET_ID: '/api/course/get/id',
  ADD_PRESENTATION: '/api/course/add/presentation',
  GET_MOST_RECENT_PRESENTATION: '/api/course/get/presentation/mostRecent',
  GET_PRESENTATIONS: '/api/course/get/presentations'
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
    console.error('[ERROR] Course Api enrollStudentInCourse', e);
    return null;
  }
}

export function gradeSummary(
  courseId,
  courseTitle,
) {
  const route = 'http://scholarapp.xyz' + routes.GRADE_SUMMARY
	+ `?courseId=${encodeURIComponent(courseId)}`
	+ `&courseTitle=${encodeURIComponent(courseTitle)}`;
  console.log('about to do this route',route);
  window.location = route;
};

export async function getAddCodes(userId) {
  try {
    return await post(routes.GET_ADD_CODES, { userId });
  } catch (e) {
    console.error('[ERROR] Course Api getAddCodes', e);
    return null;
  }
}

export async function getById(courseId) {
  try {
    return {
      course: await post(routes.GET_ID, { courseId })
    };
  } catch (e) {
    console.error('[ERROR] Course Api getById', e);
    return null;
  }
}

export async function getMostRecentPresentation(courseId) {
  try{
    return await post(routes.GET_MOST_RECENT_PRESENTATION, { courseId });
  }
  catch (e) {
    console.error("[ERROR] in Course API > getMostRecentPresentation ", e);
  }
}

//Not async because we do not want to hold up execution here
export function addPresentation(courseId, userId, title, url) {
  try {
    post(routes.ADD_PRESENTATION, { courseId, userId, title, url });
  }
  catch (e) {
    console.error("[ERROR] in Course API > addPresentation ", e);
  }
}
