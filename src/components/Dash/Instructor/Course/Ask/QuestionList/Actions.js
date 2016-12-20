import React from 'react';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Colors from '../../../../../../util/Colors';

const Rank = ({
  rank,
}) => (
  <div className="rank">
    <p className="rank-text">{rank}</p>
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
    }}
    style={{
      width: 38,
      height: 38,
      padding: 0,
      position: 'relative',
      right: 4,
    }}
    onTouchTap={() => onClick()}
  >
    <FontIcon className="material-icons">
      clear
    </FontIcon>
  </IconButton>
);

const Vote = ({
  hasVotedOn,
  onVoteClick,
}) => (
  <IconButton
    style={{
      width: 38,
      height: 38,
      padding: 0,
      position: 'relative',
      right: 6,
    }}
    onTouchTap={onVoteClick}
    >
    <FontIcon className="material-icons">
      {!!hasVotedOn
        ? 'exposure_neg_1'
        : 'exposure_plus_1'
      }
    </FontIcon>
  </IconButton>
);

const Endorse = ({
  hasBeenEndorsed,
  onEndorseClick,
  isInstructor,
}) => (
  <IconButton
    style={{
      width: 38,
      height: 38,
      padding: 0,
    }}
    iconStyle={{
      color: hasBeenEndorsed ? 'yellow' : 'black',
    }}
    onTouchTap={() => {
      if (isInstructor) {
        onEndorseClick();
      }
    }}
    >
    <FontIcon className="material-icons">
      {!!hasBeenEndorsed
        ? 'star'
        : 'star_border'
      }
    </FontIcon>
  </IconButton>
)

function getTime(created) {
  let time = moment(created).fromNow();
  const splitTime = time.split(' ');
  if (splitTime[1] === 'minutes') {
    time = `${splitTime[0]}m ago`;
  } else if (splitTime[1] === 'hours') {
    time = `${splitTime[0]}h ago`;
  }
  return time;

}

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
  const time = getTime(created);
  if (!!isInstructor) {
    return (
      <div className="buttons">
        <p className="time">{time}</p>
        <Endorse
          hasBeenEndorsed={hasBeenEndorsed}
          onEndorseClick={onEndorseClick}
          isInstructor={isInstructor}
        />
        <Clear
          isQuestion={isQuestion}
          onClick={onClearClick}
        />
        <Rank rank={rank} />
      </div>
    )
  }
  return (
    <div className="buttons">
      <p className="time">{time}</p>
      <Endorse
        hasBeenEndorsed={hasBeenEndorsed}
        onEndorseClick={onEndorseClick}
        isInstructor={isInstructor}
      />
      <Vote
        hasVotedOn={hasVotedOn}
        onVoteClick={onVoteClick}
      />
      <Rank rank={rank} />
    </div>

  );

};

export default Actions;
