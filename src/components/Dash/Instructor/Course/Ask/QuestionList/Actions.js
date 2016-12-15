import React from 'react';
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
  onClick,
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
    onClick={() => onCLick()}
  >
    <FontIcon className="material-icons">
      clear
    </FontIcon>
  </IconButton>
);

const Actions = ({
  rank,
  created,
  isQuestion,
  isInstructor,
  hasVotedOn,
  hasBeenEndorsed,
  onClearClick,
  onVoteClick,
  onEndorseClick,
}) => {
  if (!!isInstructor) {
    return (
      <div className="buttons">
        <Rank rank={rank} />
        <p className="time">{moment(created).fromNow()}</p>
        <Clear
          id={id}
          courseSessionId={courseSessionId}
          isQuestion={isQuestion}
          onClick={onClearClick}
        />
      </div>
    )

  }

};

export default Actions;
