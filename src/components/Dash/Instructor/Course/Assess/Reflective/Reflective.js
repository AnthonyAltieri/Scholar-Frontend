import React from 'react';
import Heading from '../../../Heading/Heading';
import Buttons from '../Buttons';

const Reflective = ({
  isActive,
  otherAssessmentActive,
  isCourseSessionActive,
  onStartClick,
  onEndClick,
  questionRef,
}) => (
  <div
    className="one-thirds-pane"
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
    <textarea
      className="reflective-question"
      placeholder="Enter a question..."
      ref={questionRef}
    />
    <Buttons
      isStartDisabled={isCourseSessionActive &&
        (otherAssessmentActive || isActive)
      }
      onStartClick={onStartClick}
      isEndDisabled={isCourseSessionActive &&
        (otherAssessmentActive || !isActive)
      }
      onEndClick={onEndClick}
    />
  </div>
);

export default Reflective;
