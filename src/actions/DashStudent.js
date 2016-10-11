/**
 * @author Anthony Altieri on 9/8/16.
 */


export const enterCourse = (courseId, courseSessionId) => ({
  type: 'ENTER_COURSE',
  courseSessionId,
  courseId,
});

export const retrievedQuestions = (questions) => ({
  type: 'RETRIEVED_QUESTIONS',
  questions,
});
