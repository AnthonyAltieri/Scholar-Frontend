/**
 * @author Anthony Altieri on 1/2/17.
 */

import React from 'react';
import QuestionsFilterBar from './QuestionsFilterBar';

const Questions = ({
  questions,
  isCourseSessionActive,
  addEndorse,
  removeEndorse,
  dismissQuestion,
  activeCourseSessionId,
  setFilter,
  filter,
}) => (
  <div className="fullheight fullwidth">
    <div className="heading">
      <p className="header">Question List</p>
    </div>
    <QuestionsFilterBar
      activeFilter={filter}
      onMostRecentClick={() => setFilter('MOST_RECENT')}
      onLeastRecentClick={() => setFilter('LEAST_RECENT')}
      onMostVotedClick={() => setFilter('MOST_VOTED')}
      onLeastVotedClick={() => setFilter('LEAST_VOTED')}
    />
    {isCourseSessionActive
      ? (
      <div>
        {questions.map((q) => (
          <QuestionResponse
            isQuestion
            key={q.id}
            rank={q.rank}
            depthRestriction={2}
            content={q.content}
            created={q.created}
            responses={q.responses}
            addEndorse={addEndorse}
            removeEndorse={removeEndorse}
            hasBeenEndorsed={q.isEndorsed}
            id={q.id}
            courseSessionId={activeCourseSessionId}
            dismissedQuestion={dismissQuestion}
            isInstructor
          />))}
      </div>
    )
      : (
      <div>
        <p className="no-questions">
          No Questions At The Moment
        </p>
      </div>
    )
    }
  </div>
);

export default Questions;
