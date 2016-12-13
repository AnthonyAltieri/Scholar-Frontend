import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Colors from '../../../../../util/Colors';

const CancelTag = ({
  onClick,
}) => (
  <div
    className="tag cancel"
    onClick={onClick}
  >
    <p>CANCEL</p>
  </div>
);

export default CancelTag;
