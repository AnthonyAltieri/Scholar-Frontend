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
  editOptionClear,
  editQuestionClear,
  enterAddTagMode,
  cancelAddTagMode,
  onSaveClick,
  onTagSaveClick,
  onTagRemoveClick,
}) => (
  <ul className="banked-question-list">
    {bankedAssessments.map((bq) => (
        <BankedQuestion
          key={bq.id}
          id={bq.id}
          question={bq.question}
          options={bq.options || []}
          tags={bq.tags}
          questionEdit={bq.questionEdit}
          optionsEdited={bq.optionsEdited || []}
          isOptionsVisible={bq.isOptionsVisible || false}
          questionEditMode={bq.editQuestionMode || false}
          optionEditModes={bq.optionEditModes ||
            (!!bq.options ? bq.options.map(o => false) : [])
          }
          onQuestionClick={() => {
            onQuestionClick(bq.questionEditMode, bq.id);
          }}
          onOptionsDropdownClick={() => {
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
            onOptionClearClick(index, bq.id)
          }}
          onSaveClick={onSaveClick}
          editOptionClear={() => editOptionClear(bq.id)}
          editQuestionClear={() => editQuestionClear(bq.id)}
          addTagMode={bq.addTagMode}
          enterAddTagMode={enterAddTagMode}
          cancelAddTagMode={cancelAddTagMode}
          onTagSaveClick={onTagSaveClick}
          onTagRemoveClick={onTagRemoveClick}
        />
      ))
    }

  </ul>
);

export default BankedQuestionList;
