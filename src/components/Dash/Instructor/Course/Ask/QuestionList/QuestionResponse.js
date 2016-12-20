/**
 * @author Anthony Altieri on 11/26/16.
 */

import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { toastr } from 'react-redux-toastr';
import {
  dismiss as dismissQuestion,
  endorseAdd as endorseAddQuestion,
  endorseRemove as endorseRemoveQuestion,
} from '../../../../../../api/Questions';
import {
  dismiss as dismissResponse,
  endorseAdd as endorseAddResponse,
  endorseRemove as endorseRemoveResponse,
} from '../../../../../../api/Response';
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
  addVote,
  removeVote,
  rank,
  addEndorse,
  removeEndorse,
  dismissedQuestion,
}) => {
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
          isInstructor={!!isInstructor}
          hasVotedOn={hasVotedOn}
          hasBeenEndorsed={hasBeenEndorsed}
          onClearClick={async function(){
            if (!!isQuestion) {
              try {
                const payload = await dismissQuestion(id, courseSessionId);
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                }
                dismissedQuestion(id)
                return;
              } catch (e) {
                toastr.error('Something went wrong please try again');
                console.error('[ERROR] dismissQuestion', e);
                return;
              }
            }
            try {
              const payload = await dismissResponse(id, courseSessionId);
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
                  const payload = await VoteApi.questionAdd(
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
                  addVote(id, 'UP', userId, new Date());
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] questionAdd', e);
                  return;
                }
              } else {
                try {
                  const payload = await VoteApi.responseAdd(
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
                  addVote(id, 'UP', userId, new Date());
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
                  const payload = await VoteApi.questionRemove(
                    userId,
                    id,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  removeVote(id, userId);
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] questionRemove', e);
                  return;
                }
              } else {
                try {
                  const payload = await VoteApi.responseRemove(
                    userId,
                    id,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  removeVote(id, userId);
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
            if (!hasBeenEndorsed) {
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
                  addEndorse(payload.id);
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
                  addEndorse(payload.id);
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] endorseAddResponse', e);
                }
              }
            } else {
              if (!!isQuestion) {
                try {
                  const payload = await endorseRemoveQuestion(
                    userId,
                    id,
                    courseSessionId,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  removeEndorse(payload.id);
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] endorseRemoveQuestion', e);
                }
              } else {
                try {
                  const payload = await endorseRmoveResponse(
                    userId,
                    id,
                    courseSessionId,
                  );
                  if (!!payload.error) {
                    toastr.error('Something went wrong please try again');
                    return;
                  }
                  removeEndorse(payload.id);
                  return;
                } catch (e) {
                  toastr.error('Something went wrong please try again');
                  console.error('[ERROR] endorseRemoveResponse', e);
                }
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
                rank={r.rank}
                content={r.content}
                responses={r.responses}
                created={r.created}
                depthRestriction={depthRestriction}
                depth={typeof depth === 'undefined' ? 1 : depth++}
                id={r.id}
                courseSessionId={courseSessionId}
                addVote={addVote}
                removeVote={removeVote}
                isInstructor={!!isInstructor}
              />
            )))
          : null
        }
      </ul>
    </div>
  )
};

export default QuestionResponse;
