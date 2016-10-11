/**
 * @author Anthony Altieri on 10/9/16.
 */

export const joinCourse = (id, code, title) => ({
  type: 'JOIN_COURSE',
  id,
  code,
  title,
});
