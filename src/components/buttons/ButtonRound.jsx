/**
 * @author Anthony Altieri on 9/5/16.
 */

import React from 'react';

const ButtonRound = ({
  onClick,
  children
}) => {
  return (
    <a
      onClick={onClick}
      className="button-round"
    >
      {children}
    </a>
  );
};

export default ButtonRound;