/**
 * @author Anthony Altieri on 9/6/16.
 */


/**
 * A student joins the course's active course session
 * @param id {string} the id of the course
 * @returns {{type: string, id: *}}
 */
export const joinCourse = (id, code) => {
  return {
    type: 'JOIN_COURSE',
    id,
    code,
  }
};

/**
 * An instructor activates a course to create a coruse session
 * @param id {string} the id of the course
 * @returns {{type: string, id: *}}
 */
export const activateCourse = (id) => {
  return {
    type: 'ACTIVATE_COURSE',
    id,
  }
};

/**
 * An instructor enters a course's active course session
 * @param id {string} the id of the course
 * @returns {{type: string, id: *}}
 */
export const enterCourse = (id) => {
  return {
    type: 'ENTER_COURSE',
    id,
  }
};

export const receivedCourses = (courses) => {
  return {
    type: 'RECEIVED_COURSES',
    courses
  }
};
