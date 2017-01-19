import React from 'react';
import BankedQuestion from './BankedQuestion';

const ELEMENTS_PER_PAGE = 3;
const determineNumberPages = (numberBQ) => (
  Math.ceil(numberBQ / ELEMENTS_PER_PAGE)
);

const BankedQuestionList = ({
  bankedAssessments,
  onQuestionClick,
  onOptionsDropdownClick,
  onOptionClick,
  onOptionClearClick,
  onRemoveClick,
  editOptionClear,
  editQuestionClear,
  enterAddTagMode,
  cancelAddTagMode,
  onSaveClick,
  onTagSaveClick,
  onTagRemoveClick,
  onToBankClick,
  onToQueueClick,
  isAssessmentActive,
  onUseForReflectiveClick,
  onUseForInstantClick,
  inAssess,
  isCourseSessionActive,
}) => (
  <ul className="banked-question-list">
    {bankedAssessments.map((bq) => (
        <BankedQuestion
          key={bq.id}
          id={bq.id}
          question={bq.question}
          options={bq.options || []}
          inAssess={!!inAssess}
          tags={bq.tags}
          inQueue={bq.inQueue}
          questionEdit={bq.questionEdit}
          optionsEdited={bq.optionsEdited || []}
          isOptionsVisible={bq.isOptionsVisible || false}
          questionEditMode={bq.editQuestionMode || false}
          isAssessmentActive={isAssessmentActive}
          isCourseSessionActive={isCourseSessionActive}
          onUseForReflectiveClick={onUseForReflectiveClick}
          onUseForInstantClick={onUseForInstantClick}
          optionEditModes={bq.optionEditModes ||
            (!!bq.options ? bq.options.map(o => false) : [])
          }
          onQuestionClick={() => {
            onQuestionClick(bq.questionEditMode, bq.id);
          }}
          onOptionsDropdownClick={() => {
            console.log('level 2')
            onOptionsDropdownClick(bq.isOptionsVisible, bq.id);
          }}
          onOptionClick={(index) => {
            onOptionClick(
              bq.optionEditModes[index],
              index,
              bq.id
            )
          }}
          onOptionClearClick={(index) => {
          console.log('onOptionClearClick, bq', bq);
            onOptionClearClick(index, bq.id, bq.tags)
          }}
          onSaveClick={onSaveClick}
          onRemoveClick={onRemoveClick}
          editOptionClear={() => editOptionClear(bq.id)}
          editQuestionClear={() => editQuestionClear(bq.id)}
          addTagMode={bq.addTagMode}
          enterAddTagMode={enterAddTagMode}
          cancelAddTagMode={cancelAddTagMode}
          onTagSaveClick={onTagSaveClick}
          onTagRemoveClick={onTagRemoveClick}
          onToBankClick={() => onToBankClick(bq.id)}
          onToQueueClick={() => onToQueueClick(bq.id)}
        />
      ))
    }

  </ul>
);

export default BankedQuestionList;
