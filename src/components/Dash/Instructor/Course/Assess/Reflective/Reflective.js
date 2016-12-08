import React from 'react';
import Heading from '../../../Heading/Heading';
import Buttons from '../Buttons';

const Reflective = ({
  isActive,
  otherAssessmentActive,
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
    />
    <Buttons
      isStartDisabled={otherAssessmentActive || isActive}
      isEndDisabled={otherAssessmentActive || !isActive}
    />
  </div>
);

export default Reflective;
