/**
 * @author Anthony Altieri on 9/4/16.
 */

import React from 'react';
import { addVote, removeVote } from '../../actions/Votes';

const onThumbClick = (id, userId, isUser, hasVoted, dispatch) => {
  if (isUser) {
    // TODO: display toast
    // Cannot vote on own question
    return;
  }
  if (hasVoted) {
    dispatch(addVote(id, 'UP', userId));
  } else {
    dispatch(removeVote(userId));
  }
};

const QuestionList = ({
  questions,
  userId,
}, { dispatch }) => {
  return (
    <ul>
      {questions.map((q) => {
        const isUser = q.userId === userId;
        const hasVoted = !!q.votes.filter(v => v.userId === userId)[0];
        return <Question
          key={q.id}
          content={q.content}
          isUser={isUser}
          hasVoted={hasVoted}
          rank={q.rank}
          onThumbClick={onThumbClick(q.id, userId, isUser, hasVoted, dispatch)}
        />
      })}
    </ul>
  );
};

module.exports = QuestionList;