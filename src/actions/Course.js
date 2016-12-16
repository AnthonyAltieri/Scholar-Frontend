/**
 * @author Anthony Altieri on 10/9/16.
 */

export const joinCourse = (
  id,
  abbreviation,
  title,
  activeCourseSessionId,
  timeStart,
  timeEnd,
) => ({
  type: 'JOIN_COURSE',
  id,
  abbreviation,
  title,
  activeCourseSessionId,
  timeStart,
  timeEnd,
});

export const clearCourse = () => ({
  type: 'CLEAR_COURSE',
});
