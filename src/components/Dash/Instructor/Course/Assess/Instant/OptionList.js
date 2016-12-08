import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../../util/Colors';
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

const Option = ({
  index,
  content,
}) => (
  <li className="option">
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <p className="letter">{indexToLetter(index)}</p>
      <p className="content">{content}</p>
    </div>
    <IconButton
        iconStyle={{
          color: Colors.red,
        }}
    >
      <FontIcon
        className="material-icons remove"
      >
        clear
      </FontIcon>
    </IconButton>
  </li>
);

const AddOption = ({
  onOptionAdd,
}) => {
  let content = { value: '' };
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
  onOptionAdd,
}) => (
  <ul className="option-list">
    {!options
        ? null
        : options
          .reduce((acc, cur, i) => [...acc, {...cur, index: i, }], [])
          .map((o) => (
            <Option
              key={o.index}
              index={o.index}
              content={o.content}
            />
          ))
    }
    {!options || options.length < 4
      ? <AddOption onOptionAdd={onOptionAdd}/>
      : null
    }
  </ul>
);

export default OptionList;
