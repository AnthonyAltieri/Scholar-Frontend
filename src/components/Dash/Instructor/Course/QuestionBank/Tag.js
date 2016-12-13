import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../util/Colors';

const Tag = ({
  content,
  onClearClick,
}) => (
  <div className="tag">
    <p>{content}</p>
    <FontIcon
      onClick={onClearClick}
      className="material-icons"
      style={{
        display: 'inline-block',
        position: 'relative',
        left: 10,
        color: Colors.red,
        cursor: 'pointer',
      }}
    >
      clear
    </FontIcon>
  </div>
);

export default Tag;
