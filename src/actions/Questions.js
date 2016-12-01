/**
 * @author Anthony Altieri on 11/27/16.
 */

export const questionRemove = (id) => ({
  type: 'QUESTION_REMOVE',
  id,
});

export const responseRemove = (id) => ({
  type: 'RESPONSE_REMOVE',
  id,
});
