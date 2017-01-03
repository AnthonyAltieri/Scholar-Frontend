/**
 * @author Anthony Altieri on 12/28/16.
 */

export const setSelectedCourse = (course) => ({
  type: 'SET_SELECTED_COURSE',
  course,
});

export const clearSelectedCourse = () => ({
  type: 'CLEAR_SELECTED_COURSE',
});

export const setCourseSectionPanelLoadingOn = () => ({
  type: 'SET_COURSE_SECTION_LOADING_ON',
});

export const setCourseSectionPanelLoadingOff = () => ({
  type: 'SET_COURSE_SECTION_LOADING_OFF',
});

export const setCourseSectionError = () => ({
  type: 'SET_COURSE_SECTION_ERROR',
});

export const clearCourseSectionError = () => ({
 type: 'CLEAR_COURSE_SECTION_ERROR',
});

export const setCourseSectionLastCourseSession = (courseSession) => ({
  type: 'SET_COURSE_SECTION_LAST_COURSE_SESSION',
  courseSession,
});

export const clearCourseSectionLastCourseSession = () => ({
  type: 'CLEAR_COURSE_SECTION_LAST_COURSE_SESSION',
});
