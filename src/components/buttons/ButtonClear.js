/**
 * @author Anthony Altieri on 9/5/16.
 */

import React from 'react';

const ButtonClear = ({
  onClick,
  children,
  style,
}) => {
  return (
    <a
      className="button-clear"
      onClick={onClick}
      style={style}
    >
      {children}
    </a>
  );
};

export default ButtonClear;
