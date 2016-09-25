const Question = ({
  isUser,
  rank,
  hasVoted,
  content,
  onThumbClick,
}) => (
  <div>
    <QuestionIcon isUser={isUser} />
    <div className="content">
      {content}
    </div>
    <BoxVote
      onThumbClick={onThumbClick}
      hasVoted={hasVoted}
      rank={rank}
    />
  </div>
);


const QuestionIcon = ({ isUser }) => (
  <img
    className="icon"
    src={isUser
      ? '/static/img/question/iconstudent-self.svg'
      : '/static/img/question/iconstudent-other.svg'
    }
  />
);

const BoxVote = ({
  rank,
  hasVoted,
  onThumbClick,
}) => (
  <div className="box-vote">
    <img
      className="thumb"
      onClick={onThumbClick}
      src={hasVoted
        ? '/static/img/question/thumb-active.svg'
        : '/static/img/question/thumb-inactive.svg'
      }
    />
    <a className="rank">{rank}</a>
  </div>
);

module.exports = Question;
