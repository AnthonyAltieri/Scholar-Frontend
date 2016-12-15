/**
 * @author Anthony Altieri on 11/26/16.
 */

import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { dismiss as dismissQuestion } from '../../../../../../api/Questions';
import { dismiss as dismissResponse } from '../../../../../../api/Response';
import Actions from './Actions';


const QuestionResponse = ({
  isQuestion,
  votes,
  userId,
  depth,
  depthRestriction,
  content,
  created,
  responses,
  id,
  hasBeenEndorsed,
  isInstructor,
  courseSessionId,
}) => {
  const rank = !!votes
    ? votes.filter(v => v.type === 'UP').length
    : 0;
  const hasVotedOn = !!votes
    ? votes.filter(v => v.userId === userId).length > 0
    : false;

  return (
    <div
      className={`question-response ${!!isQuestion ? 'question' : 'response'}`}
    >
      <p className="content">{content}</p>
      <div
        className="r-right"
        style={{
          paddingRight: 8,
        }}
      >
        <Actions
          rank={rank}
          created={created}
          isQuestion={isQuestion}
          isInstructor={isInstructor}
          hasVotedOn={hasVotedOn}
          hasBeenEndorsed={hasBeenEndorsed}
          onClearClick={async function(){
            if (!!isQuestion) {
              try {
                const payload = await dismissQuestion(id);
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                }
                return;
              } catch (e) {
                toastr.error('Something went wrong please try again');
                console.error('[ERROR] dismissQuestion', e);
                return;
              }
            }
            try {
              const payload = await dismissResponse(id);
              if (!!payload.error) {
                toastr.error('Something went wrong please try again');
              }
              return;
            } catch (e) {
              toastr.error('Something went wrong please try again');
              console.error('[ERROR] dismissResponse', e);
              return;
            }
          }}
          onVoteClick={async function() {
            if (hasVotedOn) {
              try {
                // TODO: vote api
              } catch (e) {
                toastr.error('Something went wrong please try again');
                console.error('[ERROR]')
                return;
              }
            }
          }}
        />
      </div>
      <ul className="question-response-list">
        {(typeof depth === 'undefined' || depthRestriction > depth)
          ? (responses.map((r) => (
              <QuestionResponse
                key={r.id}
                rank={r.votes.filter(v => v.type === 'UP').length}
                content={r.content}
                responses={r.responses}
                created={r.created}
                depthRestriction={depthRestriction}
                depth={typeof depth === 'undefined' ? 1 : depth++}
                id={r.id}
                courseSessionId={courseSessionId}
              />
            )))
          : null
        }
      </ul>
    </div>
  )
};

export default QuestionResponse;
