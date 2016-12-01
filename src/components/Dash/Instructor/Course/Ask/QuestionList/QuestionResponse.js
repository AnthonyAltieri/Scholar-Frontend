/**
 * @author Anthony Altieri on 11/26/16.
 */

import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { dismiss as dismissQuestion } from '../../../../../../api/Questions';
import { dismiss as dismissResponse } from '../../../../../../api/Response';
import moment from 'moment';
import Colors from '../../../../../../util/Colors';

const Rank = ({
  rank,
}) => (
  <div className="rank">
    {rank}
  </div>
);

const Clear = ({
  id,
  isQuestion,
  courseSessionId,
}) => (
  <IconButton
    className="clear"
    iconStyle={{
          color: Colors.red,
          width: 24,
          height: 24,
        }}
    style={{
          width: 24,
          height: 24,
          padding: 0,
        }}
    onClick={() => {
      console.log('clear click');
      if (!courseSessionId) return;
      if (!!isQuestion) {
        dismissQuestion(id, courseSessionId);
      } else {
        dismissResponse(id, courseSessionId);
      }
    }}
  >
    <FontIcon className="material-icons">
      clear
    </FontIcon>
  </IconButton>
);

const QuestionResponse = ({
  isQuestion,
  rank,
  depth,
  depthRestriction,
  content,
  created,
  responses,
  id,
  courseSessionId,
}) => {
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
        <div className="buttons">
          <Rank rank={rank} />
          <p className="time">{moment(created).fromNow()}</p>
          <Clear
            id={id}
            courseSessionId={courseSessionId}
            isQuestion={isQuestion}
          />
        </div>
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
