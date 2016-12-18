import React from 'react';
import Colors from '../../../util/Colors';
import RaisedButton from 'material-ui/RaisedButton';

const MAX_DISPLAY_QUESTION_WORDS = 8;
const MAX_DISPLAY_ANSWER_WORDS = 10;

function calculateQuestionText(question) {
  let questionText = !question
    ? 'Verbal/Slide question asked'
    : question;
  const questionWords = questionText.split(' ')
  if (questionWords.length > MAX_DISPLAY_QUESTION_WORDS) {
    const displayedWords = questionWords
      .slice(0, MAX_DISPLAY_QUESTION_WORDS)
      .reduce((a, c, i) => (
        (i === 0) ? c : (a + ' ' + c)
      ), '');
    questionText = `${displayedWords}...`;
  }
  return questionText;
}

function indexToLetter(index) {
  switch (index) {
    case 0: { return 'A'; }
    case 1: { return 'B'; }
    case 2: { return 'C'; }
    case 3: { return 'D'; }
    case 4: { return 'E'; }
    default: {
      throw new Error(`Invalid index for letter ${index}`);
    }
  }
}

function calculateAnswerText(assessmentType, selectedOption, submittedAnswer) {
  if (selectedOption === -1) {
    return 'Not Answered!'
  }
  if (assessmentType === 'INSTANT') {
    return indexToLetter(selectedOption).toUpperCase();
  } else if (assessmentType === 'REFLECTIVE') {
    let answerText = submittedAnswer;
    let answerWords = submittedAnswer.split(' ');
    if (answerWords.length > MAX_DISPLAY_ANSWER_WORDS) {
      const displayedWords = answerText
        .slice(0, MAX_DISPLAY_QUESTION_WORDS);
      answerText = `${displayedWords}...`;
    }
    return answerText;

  }
  throw new Error(`Invalid assessment type ${assessmentType}`);
}

const AssessmentBox = ({
  type,
  question,
  selectedOption,
  activateAssessmentMode,
  hasAnsweredReflective,
  toReview,
}) => {
  let typeText;
  let backgroundColor;
  if (type === 'INSTANT') {
    typeText = 'Instant';
    backgroundColor = Colors.courseTiles.blue;
  } else if (type === 'REFLECTIVE') {
    typeText = 'Reflective'
    backgroundColor = Colors.courseTiles.pink;
  } else {
    throw new Error(`Invalid assessment type ${type}`);
  }
  const questionText = calculateQuestionText(question);
  const answerText = calculateAnswerText(type, selectedOption);
  let reflectiveDisplay = null;
  if (hasAnsweredReflective) {
    reflectiveDisplay = (<p><span>{toReview.length} to review</span></p>);
  } else {
    reflectiveDisplay = (<p><span>A:</span>{answerText}</p>);
  }
  return (
    <div
      className="assessment-box"
    >
      <div
        className="r-center"
        style={{
          backgroundColor,
        }}
      >
        <h3>{typeText} Assessment Active</h3>
      </div>
      <p><span>Q:</span>{questionText}</p>
      {type === 'REFLECTIVE'
        ? reflectiveDisplay
        : null
      }
      {type === 'INSTANT'
        ? (<p><span>A:</span>{answerText}</p>)
        : null
      }
      <div className="r-right">
        <RaisedButton
          label="Answer"
          secondary
          fullWidth
          style={{
          }}
          onClick={() => {
            activateAssessmentMode();
          }}
        />

      </div>
    </div>
  );

};

export default AssessmentBox;
