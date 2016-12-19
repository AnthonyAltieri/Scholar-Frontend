import React from 'react';
import Heading from '../../../Heading/Heading';
import Buttons from '../Buttons';
import RedRaisedButton from '../../../../../buttons/RedRaisedButton';
import GreenRaisedButton from '../../../../../buttons/GreenRaisedButton';

const Reflective = ({
  isActive,
  otherAssessmentActive,
  isCourseSessionActive,
  onStartAnsweringClick,
  onStartReviewClick,
  onEndClick,
  questionRef,
  hasReviewStarted,
}) => {
  let stage = 'None';
  if (isActive) {
    if (hasReviewStarted) {
      stage = 'Review'
    } else {
      stage = 'Answering'
    }
  }
  console.log('@@@@@@@@@@ hasReviewStarted', hasReviewStarted);
  console.log('@@@@@@@@@@ otherAssessmentActive', otherAssessmentActive);
  console.log('@@@@@@@@@@ !isActive', !isActive);

  return (
    <div
      className="reflective"
      style={{
        marginTop: "1%",
      }}
    >
      <Heading
        text="Reflective"
        hasActive
        isLeft
        isActive={isActive}
      />
      <p className="stage"><span>Stage:</span>{stage}</p>
      <textarea
        className="reflective-question"
        placeholder="Enter a question..."
        ref={questionRef}
      />
      <div
        className="card-buttons"
        style={{
          flexWrap: 'wrap',
        }}
        >
        <RedRaisedButton
          label="End"
          style={{
            marginRight: 8,
            marginTop: 6,
            marginBottom: 6,
          }}
          disabled={!isCourseSessionActive
          || otherAssessmentActive || !isActive
          || !hasReviewStarted
          }
          onTouchTap={onEndClick}
        />
        <GreenRaisedButton
          label="Start Answering"
          disabled={!isCourseSessionActive
            || otherAssessmentActive || isActive
          }
          onTouchTap={onStartAnsweringClick}
          style={{
            marginTop: 6,
            marginBottom: 6,
          }}
        />
        <GreenRaisedButton
          label="Start Review"
          disabled={!isCourseSessionActive
            || !isActive || otherAssessmentActive
            || (isActive && hasReviewStarted)
          }
          onTouchTap={onStartReviewClick}
          style={{
            marginTop: 6,
            marginBottom: 6,
            marginLeft: 8,
          }}
        />

      </div>
    </div>
  );
};

export default Reflective;
