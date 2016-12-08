/**
 * @author Anthony Altieri on 10/11/16.
 */

import React from 'react';

const StatBlock = ({
  name,
  number,
  isMini,
}) => {
  return (
    <div className={`stat ${!!isMini ? 'mini' : ''}`}>
      <h3 className="name">{name}</h3>
      <p className="number">{number}</p>
    </div>
  );
};

export default StatBlock;
