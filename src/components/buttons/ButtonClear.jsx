/**
 * @author Anthony Altieri on 9/5/16.
 */

import React from 'react';

const ButtonClear = ({
  onClick,
  children,
}) => {
  return (
    <a
      className="button-clear"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default ButtonClear;
