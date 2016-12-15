/**
 * @author Anthony Altieri on 11/26/16.
 */

import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { dismiss as dismissQuestion, endorseAdd as endorseAddQuestion }
  from '../../../../../../api/Questions';
import { dismiss as dismissResponse, endorseAdd as endorseAddResponse }
  from '../../../../../../api/Response';
import * as VoteApi from '../../../../../../api/Vote';
import Actions from './Actions';


const QuestionResponse = ({
  isQuestion,
  votes,
  userId,
  courseId,
  courseSessionId,
  depth,
  depthRestriction,
  content,
  created,
  responses,
  id,
  hasBeenEndorsed,
  isInstructor,
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
            if (!hasVotedOn) {
              if (isQuestion) {
                try {
                  const payload = await Vote.questionAdd(
                    userId,
                    courseId,
                    courseSessionId,
                    'QUESTION',
                    id,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  // TODO: add vote action
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] questionAdd', e);
                  return;
                }
              } else {
                try {
                  const payload = await Vote.responseAdd(
                    userId,
                    courseId,
                    courseSessionId,
                    'RESPONSE',
                    id,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  // TODO: add response action
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] responseAdd', e);
                  return;
                }
              }
            } else {
              if (isQuestion) {
                try {
                  const payload = await Vote.questionRemove(
                    userId,
                    id,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  // TODO: question remove action
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] questionRemove', e);
                  return;
                }
              } else {
                try {
                  const payload = await Vote.responseRemove(
                    userId,
                    id,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  // TODO: response remove action
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] responseRemove', e);
                  return;
                }
              }
            }
          }}
          onEndorseClick={async function() {
            if (!!hasBeenEndorsed) {
              const type = isQuestion ? 'question' : 'response';
              toastr.info(`This ${type} has already been endorsed`);
              return;
            }
            if (isQuestion) {
              try {
                const payload = await endorseAddQuestion(
                  userId,
                  id,
                  courseSessionId,
                );
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                // TODO: question endorse add action
                return;
              } catch (e) {
                toastr.error('Something went wrong please try again');
                console.error('[ERROR] endorseAddQuestion', e);
              }
            } else {
              try {
                const payload = await endorseAddResponse(
                  userId,
                  id,
                  courseSessionId,
                );
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
              } catch (e) {
                toastr.error('Something went wrong please try again');
                console.error('[ERROR] endorseAddResponse', e);
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
