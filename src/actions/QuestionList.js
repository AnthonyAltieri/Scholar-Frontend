/**
 * @author Anthony Altieri on 11/12/16.
 */

export const addQuestion = (
  id,
  content,
  userId,
  created,
  rank,
  votes,
) => ({
  type: 'ADD_QUESTION',
  id,
  content,
  userId,
  created,
  rank,
  votes,
});

export const dismissQuestion = (id) => ({
  type: 'DISMISS_QUESTION',
  id,
});

export const addResponse = (
  id,
  content,
  userId,
  created,
  rank,
  votes,
) => ({
  type: 'ADD_RESPONSE',
  id,
  content,
  userId,
  created,
  rank,
  votes,
});

export const receivedQuestions = (questions) => ({
  type: 'RECEIVED_QUESTIONS',
  questions,
});

export const removeResponse = (id) => ({
  type: 'REMOVE_RESPONSE',
  id,
});

export const addVote = (
  id,
  voteType,
  userId,
  created,
) => ({
  type: 'ADD_VOTE',
  id,
  voteType,
  userId,
  created,
});

export const removeVote = (
  id,
  userId,
) => ({
  type: 'REMOVE_VOTE',
  id,
  userId,
});

export const addFlag = () => ({
  type: 'ADD_FLAG',
});

export const removeFlag = () => ({
  type: 'REMOVE_FLAG',
});

export const addEndorse = (id) => ({
  type: 'ADD_ENDORSE',
  id,
});

export const removeEndorse = (id) => ({
  type: 'REMOVE_ENDORSE',
  id,
});
