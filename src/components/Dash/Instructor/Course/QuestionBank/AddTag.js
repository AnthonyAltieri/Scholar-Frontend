import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../util/Colors';

const AddTag = ({
  onClick,
}) => (
  <div
    className="tag add"
    onClick={onClick}
  >
    <p>ADD TAG</p>
    <FontIcon
      onClick={onClick}
      className="material-icons"
      style={{
        display: 'inline-block',
        position: 'relative',
        left: 10,
        cursor: 'pointer',
      }}
    >
      add
    </FontIcon>
  </div>
);

export default AddTag;
