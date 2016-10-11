/**
 * @author Anthony Altieri on 10/9/16.
 */

export const startedCourseSession = (id) => ({
  type: 'STARTED_COURSESESSION',
  id,
});

export const endedCourseSession = () => ({
  type: 'ENDED_COURSESESSION',
});
