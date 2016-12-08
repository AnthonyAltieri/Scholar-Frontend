import React from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Colors from '../../../../../../util/Colors';


const Option = ({
  index,
  content,
}) => (
  <div className="option">
    <div className="container-letter">
      <p className="letter">{indexToLetter(index)}</p>
      <FontIcon
        className="material-icons remove"
        style={{
          color: Colors.red,
        }}
      >
        clear
      </FontIcon>
    </div>
    <p className="content">{content}</p>
  </div>
);

const AddOption = ({
}) => (
  <div className="option add">
    <p>Add Option</p>
    <FontIcon
      className="material-icons plus"
      style={{
        width: 30,
        height: 30,
        color: "#333333",
      }}
    >
      add
    </FontIcon>
  </div>
);

const OptionGrid = () => (
  <div className="option-grid">
    <Option
      index={0}
      content="This is a short option"
    />
    <Option
      index={1}
      content="This is a short option"
    />
    <AddOption
    />

  </div>
);

export default OptionGrid;
