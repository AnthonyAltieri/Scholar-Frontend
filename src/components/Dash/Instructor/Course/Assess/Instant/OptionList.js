import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../../util/Colors';
import Option from '../../QuestionBank/Option';
import FlatButton from 'material-ui/FlatButton';

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

// const Option = ({
//   index,
//   content,
// }) => (
//   <li className="option">
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <p className="letter">{indexToLetter(index)}</p>
//       <p className="content">{content}</p>
//     </div>
//     <IconButton
//         iconStyle={{
//           color: Colors.red,
//         }}
//     >
//       <FontIcon
//         className="material-icons remove"
//       >
//         clear
//       </FontIcon>
//     </IconButton>
//   </li>
// );

const AddOption = ({
  onOptionAdd,
}) => {
  let content;
  return (
  <li className="add-option">
    <textarea
      ref={(n) => {
        if (!n) return;
        content = n;
      }}
      placeholder="Add an option to an instant assessment..."
    />
    <IconButton
      iconStyle={{
        color: Colors.green,
      }}
      onClick={() => {
        onOptionAdd(content.value)
        content.value = '';
      }}
    >
      <FontIcon
        className="material-icons"
      >
        add
      </FontIcon>
    </IconButton>
  </li>
  )
};

const OptionList = ({
  options,
  optionsRef,
  optionEditModes,
  onOptionAdd,
  onOptionClear,
  onOptionContentClick,
  onOptionClearClick,
  chooseCorrectOption,
  unselectCorrectOption,
  correctOption,
}) => {
  return (
    <ul className="option-list">
      {(!!options && options.length > 0)
        ? (<p
          style={{
            fontSize: 12,
            width: '100%',
            textAlign: 'center',
            margin: 2,
          }}
        >
          Click letter of correct answer, click again to unselect
        </p>)
        : null
      }
      {!options
          ? null
          : options
            .reduce((acc, c, i) => [...acc, { content: c, index: i, }], [])
            .map((o) => (
              <Option
                key={`${o.index}--${o.content}`}
                index={o.index}
                content={o.content}
                isEditable={true}
                isCorrectOption={typeof correctOption !== 'undefined'
                  ? o.index === correctOption
                  : false
                }
                onLetterClick={() => {
                  if (correctOption === o.index) {
                    unselectCorrectOption();
                    return;
                  }
                  chooseCorrectOption(o.index)
                }}
                ref={optionsRef}
                onContentClick={() => onOptionContentClick(o.index)}
                onClearClick={() => onOptionClearClick(o.index)}
              />
            ))
      }
      {!options || options.length < 5
        ? <AddOption onOptionAdd={onOptionAdd}/>
        : null
      }
    </ul>
  )
};

export default OptionList;
