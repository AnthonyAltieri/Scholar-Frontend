import React from 'react';
import Heading from '../../../Heading/Heading';
import Buttons from '../Buttons'
import OptionList from './OptionList';

const Instant = ({
  otherAssessmentActive,
  isActive,
  options,
  onOptionAdd,
  onOptionClear,
  onOptionClearClick,
  onOptionContentClick,
  questionRef,
  onStartClick,
  onEndClick,
}) => (
  <div
    className="two-thirds-pane c-between fullwidth"
    style={{
      marginBottom: "1%",
    }}
  >
    <div className="fullwidth">
      <Heading
        text="Instant"
        hasActive
        isLeft
        isActive={isActive}
      />
      <OptionList
        options={options}
        onOptionContentClick={onOptionContentClick}
        onOptionClearClick={onOptionClearClick}
        onOptionAdd={onOptionAdd}
        onOptionClear={onOptionClear}
      />
    </div>
    <div className="fullwidth">
      <textarea
        placeholder="Enter question here..."
        className="reflective-question"
        style={{
          height: 52,
        }}
        ref={questionRef}
      />
      <Buttons
        isStartDisabled={otherAssessmentActive || isActive}
        isEndDisabled={otherAssessmentActive || !isActive}
        onStartClick={onStartClick}
        onEndClick={onEndClick}
      />
    </div>
  </div>
);

export default Instant;
