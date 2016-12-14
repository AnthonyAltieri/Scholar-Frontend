import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../util/Colors';

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

const Option = ({
  index,
  content,
  editContentId,
  isEditable,
  isCorrectOption,
  onEditContentChange,
  onContentClick,
  onClearClick,
  onLetterClick,
  editRef,
}) => {
  console.log('index', index);
  console.log('isCorrectOption', isCorrectOption);


  return (
    <div
      key={index}
      className={`bq-option ${isCorrectOption ? 'correct' : ''}` }
    >
      <IconButton
        className="bq-clear"
        iconStyle={{
          color: Colors.red,
        }}
        onClick={() => {
          onClearClick(index)
        }}
      >
        <FontIcon className="material-icons">
          clear
        </FontIcon>
      </IconButton>
      <p
        className="bq-letter"
        onClick={onLetterClick}
      >
        {indexToLetter(index)}
      </p>
      {!isEditable
        ? (<p
            className="bq-content"
            onClick={onContentClick}
          >
            {content}
          </p>)
        : (<textarea
          className="bq-content editable"
          id={editContentId}
          onChange={onEditContentChange}
          ref={editRef}
          defaultValue={content}
        />)
      }

    </div>

  )

};

export default Option;
