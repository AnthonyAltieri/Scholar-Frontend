import React from 'react';
import Heading from '../../../Heading/Heading';
import Buttons from '../Buttons'
import OptionList from './OptionList';

const Instant = ({
  otherAssessmentActive,
  isActive
}) => (
  <div
    className="two-thirds-pane"
    style={{
      marginBottom: "1%",
    }}
  >
    <Heading
      text="Instant"
      hasActive
      isLeft
      isActive={isActive}
    />
    <OptionList
      onOptionAdd={(content) => {}}
    />
    <Buttons
      isStartDisabled={otherAssessmentActive || isActive}
      isEndDisabled={otherAssessmentActive || !isActive}
    />
  </div>
);

export default Instant;
