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
  isCourseSessionActive,
  optionsRef,
  chooseCorrectOption,
  unselectCorrectOption,
  correctOption,
}) => {
  return (
    <div
      className="c-between fullwidth"
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
          isActive={isActive}
          options={options}
          onOptionContentClick={onOptionContentClick}
          chooseCorrectOption={chooseCorrectOption}
          unselectCorrectOption={unselectCorrectOption}
          onOptionClearClick={onOptionClearClick}
          onOptionAdd={onOptionAdd}
          onOptionClear={onOptionClear}
          optionsRef={optionsRef}
          correctOption={correctOption}
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
          isStartDisabled={isCourseSessionActive &&
            (otherAssessmentActive || isActive)
          }
          isEndDisabled={isCourseSessionActive &&
            (otherAssessmentActive || !isActive)
          }
          onStartClick={() => onStartClick()}
          onEndClick={onEndClick}
        />
      </div>
    </div>

  )
};

export default Instant;
