import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

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
  isEditable,
  onClearClick,
}) => (
  <div
    key={index}
    className="option"
    onClick={() => {
    }}
  >
    <IconButton
      className="bq-clear"
      onClick={() => {
        onClearClick(index)
      }}
    >
      <FontIcon className="material-icons">
        clear
      </FontIcon>
    </IconButton>
    <p className="bq-letter">{indexToLetter(index)}</p>
    {!!isEditable
      ? <p className="bq-content">{content}</p>
      : <textarea className="bq-content editable" />
    }

  </div>

);

export default Option;
