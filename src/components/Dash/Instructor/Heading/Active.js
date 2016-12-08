import React from 'react';
import Colors from '../../../../util/Colors';

const Active = ({
  isActive,
}) => (
  <div className="active-status">
    <h3
      className="status"
      style={{
        backgroundColor: `${isActive ? Colors.darkGreen : Colors.lightGray}`,
      }}
    >
      {isActive ? 'ACTIVE' : 'INACTIVE'}
    </h3>

  </div>
);

export default Active;
