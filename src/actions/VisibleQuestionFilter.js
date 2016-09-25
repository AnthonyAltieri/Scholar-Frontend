/**
 * @author Anthony Altieri on 9/4/16.
 */

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_QUESTION_VISIBILITY_FILTER',
    filter,
  }
};
