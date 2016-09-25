/**
 * @author Anthony Altieri on 9/4/16.
 */

export const addVote = (id, voteType, userId) => {
  return {
    type: 'ADD_VOTE',
    id,
    voteType,
    userId,
    created: new Date(),
  }
};

export const removeVote = (userId) => {
  return {
    type: 'REMOVE_VOTE',
    userId
  }
};
