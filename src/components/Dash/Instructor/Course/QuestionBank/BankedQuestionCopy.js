import React from 'react';

const indexToLetter = (index) => {
  switch (index) {
    case 0: return 'A';
    case 1: return 'B';
    case 2: return 'C';
    case 3: return 'D';
    case 4: return 'E';
    default: {
      throw new Error(`Invalid index for letter: ${index}`);
    }
  }
}

const BankedQuestion = ({
  content,
  options,
  onBankedQuestionClick,
}) => (
  <li className="banked-question c">
    <div
      className="r left-right-padding-small"
    >
      <p className="question-label">Q:</p>
      <p className="question-content">{content}</p>
    </div>
    {options
      .reduce((acc, cur, i) => [...acc, {...cur, index: i} ],[])
      .map((o) => (
        <div
          key={o.index}
          className="option"
          onClick={() => {
            onBankedQuestionClick(o);
          }}
        >
          <p className="bq-letter">{indexToLetter(o.index)}</p>
          <p className="bq-content">{o.content}</p>
        </div>
    ))}
  </li>
);

export default BankedQuestion;
